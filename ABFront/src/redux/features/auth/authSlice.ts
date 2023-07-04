/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, ICredentials } from "../../../services/API";
import cookiesManager from "../../../services/cookiesManager";
// import { RootState } from "../../store";

const initialState : authState = {
    logged : false,
    id : null,
    email : null,
    firstname : null,
    lastname : null,
    token : null,
    loading: 'idle'
}

// {state} = thunkAPI.state : accessing store state
// export const getProfile = createAsyncThunk<IGetProfilePayloadResponse, {state: RootState}>('auth/getProfile', async ({state}) => {
export const getProfile = createAsyncThunk('auth/getProfile', async (token : string | null) => {
    return token != null ? await API.getProfile(token) : {id : null, email : null, firstname : null, lastname : null}
})
    
export const logAttempt = createAsyncThunk('auth/logAttempt', async (logCredentials : ICredentials) => {
    const response = await API.login(logCredentials)
    // set cookies so user connection isn't lost when the page is refreshed
    if(response.token != null && logCredentials.persistent) cookiesManager.setAuthCookies(logCredentials.email, response.token)
    return response
})

export const updateNames = createAsyncThunk('auth/updateNames', async (arg : IParamUpdateNames) => {
    return arg.token != null ? await API.updateNames({firstName : arg.firstName, lastName : arg.lastName}, arg.token) : {id : null, email : null, firstname : null, lastname : null}
})

export const authSlice = createSlice({
    name : 'auth', // => slice state will be reached through store.auth
    initialState,
    reducers : {
        // action : reducer
        reset : () => {
            return initialState
        },
        setCredentials : (state, action) => {
            const { email, token } = action.payload
            return {...state, logged: true, email: email, token: token}
        },
        setNames : (state, action) => {
            const { firstname, lastname } = action.payload
            return {...state, firstname: firstname, lastname: lastname}
        },
        logout : () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            // log
            .addCase(logAttempt.pending, (state) => {
                return {...state, loading : 'pending'}
            })
            .addCase(logAttempt.fulfilled, (state, action) => {
                const { email, token } = action.payload || {email : null, token : null}
                return {...state, loading : 'idle', logged : true, email, token}
            })
            .addCase(logAttempt.rejected, (state) => {
                return {...state, loading : 'idle'}
            })
            // get profile
            .addCase(getProfile.pending, (state) => {
                return {...state, loading : 'pending'}
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                const {id, email, firstname, lastname} = action.payload
                // console.log("payload", action.payload)
                return {...state, loading : 'idle', id, email, firstname, lastname}
            })
            .addCase(getProfile.rejected, (state) => {
                return {...state, loading : 'idle'}
            })
        },
})

export const {setCredentials, setNames, logout, reset} = authSlice.actions

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
    token : string | null
}