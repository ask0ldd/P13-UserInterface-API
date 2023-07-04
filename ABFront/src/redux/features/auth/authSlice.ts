/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICredentials } from "../../../services/API";
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

const api = "http://127.0.0.1:3001/api/v1/"

export const logAttempt = createAsyncThunk('auth/logAttempt', async (logCredentials : ICredentials) => {
    try{
        console.log("thunk")
        const response = await fetch(`${api}user/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logCredentials)      
        })

        if(response.ok && response.status === 200)
        {
            const userDatas = await response.json()
            // if rememberMe checked => persistent connection
            if(logCredentials.persistent) cookiesManager.setAuthCookies(logCredentials.email, userDatas.body.token)
            return {email: logCredentials.email, token: userDatas.body.token}
        }
        else{
            console.log(response.statusText)
        }
    }catch(error){
        console.log(error)
    }
})

/*interface IGetProfilePayloadResponse{
    id? : number
    email? : string
    firstname? : string
    lastname? : string
    error? : string
}*/

// {state} = thunkAPI.state : accessing store state
// export const getProfile = createAsyncThunk<IGetProfilePayloadResponse, {state: RootState}>('auth/getProfile', async ({state}) => {
export const getProfile = createAsyncThunk('auth/getProfile', async (token : string | null) => {
    try{
        // const token = "token"
        if(token == null) throw new Error("The global state contains no token.")
        const response = await fetch(`${api}user/profile`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }     
        })

        if(response.ok)
        {
            const userDatas = await response.json()
            const id = userDatas.body.id
            const email = userDatas.body.email
            const firstname = userDatas.body.firstName
            const lastname = userDatas.body.lastName
            return {id, email, firstname, lastname}
        }
        else{
            console.error("Service Unavailable. Retry Later.")
            return {id : null, email : null, firstname : null, lastname : null}
        }
    }
    catch
    {
        console.error("Service Unavailable. Retry Later.")
        return {error : "Service Unavailable. Retry Later."}
    }
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
        /*setToken : (state, action) => {
            const {token} = action.payload
            return {...state, token: token}
        },*/
        logout : () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
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

export const {setCredentials, /*setToken,*/ setNames, logout, reset} = authSlice.actions

export default authSlice.reducer

interface authState{
    logged : boolean
    id : string | null
    email : string | null
    firstname : string | null
    lastname : string | null
    token : string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}