/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, ICredentials } from "../../../services/API";
import cookiesManager from "../../../services/cookiesManager";

const initialState : authState = {
    logged : false,
    id : null,
    email : null,
    firstname : null,
    lastname : null,
    token : null,
    loading: 'idle'
}

// Thunk retrieving the active user's profile
export const getProfile = createAsyncThunk('auth/getProfile', async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: authState }
    // get user's profile datas only if connected
    return auth.token != null ? await API.getProfile(auth.token) 
        : {datas : {id : null, email : null, firstname : null, lastname : null}, failed : true}
})
    
// Thunk executing a log attempt & setting up some cookies if successful
export const logAttempt = createAsyncThunk('auth/logAttempt', async (logCredentials : ICredentials) => {
    const response = await API.login(logCredentials)
    // set cookies so user connection isn't lost when the page is refreshed / the state is emptied
    if(response.datas.token != null && response.failed === false && logCredentials.persistent) cookiesManager.setAuthCookies(logCredentials.email, response.datas.token)
    return response
})

// Thunk updating the user's names in DB (through the existing API)
export const updateNames = createAsyncThunk('auth/updateNames', async (arg : IParamUpdateNames, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: authState }
    // update user's names only if connected
    return auth.token != null ? await API.updateNames({firstName : arg.firstName, lastName : arg.lastName}, auth.token) 
        : {datas : {id : null, email : null, firstname : null, lastname : null}, failed : true}
})

export const authSlice = createSlice({
    name : 'auth', // this slice sub state will be reached through store.auth
    initialState,
    reducers : {
        // action : reducer fn
        reset : () => {
            return initialState
        },
        setCredentials : (state, action) => {
            const { email, token } = action.payload
            return {...state, logged: true, email: email, token: token}
        },
        logout : () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            // log life cycle
            .addCase(logAttempt.pending, (state) => {
                return {...state, loading : 'pending'}
            })
            .addCase(logAttempt.fulfilled, (state, action) => {
                // fullfiled doesn't mean the login attempt succeeded
                if(action.payload?.failed === true) return {...state, loading : 'idle'}
                const { email, token } = action.payload.datas
                return {...state, loading : 'idle', logged : true, email, token}
            })
            .addCase(logAttempt.rejected, (state) => {
                return {...state, loading : 'idle'}
            })
            // get profile life cycle
            .addCase(getProfile.pending, (state) => {
                return {...state, loading : 'pending'}
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                if(action.payload?.failed === true) return {...state, loading : 'idle'}
                const {id, email, firstname, lastname} = action.payload.datas
                return {...state, loading : 'idle', id, email, firstname, lastname}
            })
            .addCase(getProfile.rejected, (state) => {
                return {...state, loading : 'idle'}
            })
            // update names life cycle
            .addCase(updateNames.pending, (state) => {
                return {...state, loading : 'pending'}
            })
            .addCase(updateNames.fulfilled, (state, action) => {
                if(action.payload?.failed === true) return {...state, loading : 'idle'}
                const {id, email, firstname, lastname} = action.payload.datas
                return {...state, loading : 'idle', id, email, firstname, lastname}
            })
            .addCase(updateNames.rejected, (state) => {
                return {...state, loading : 'idle'}
            })
        },
})

export const {setCredentials, logout, reset} = authSlice.actions

export default authSlice.reducer

interface authState {
    logged : boolean
    id : string | null
    email : string | null
    firstname : string | null
    lastname : string | null
    token : string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface IParamUpdateNames{
    firstName : string
    lastName : string
}