/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICredentials } from "../../../services/API";

const initialState : authState = {
    logged : false,
    id : null,
    email : null,
    firstname : null,
    lastname : null,
    token : null,
    loading: 'idle'
}

export const logAttempt = createAsyncThunk('auth/logAttempt', async (logCredentials : ICredentials) => {
    try{
        const response = await fetch(`http://127.0.0.1:3001/api/v1/user/login`,
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
            return {email: logCredentials.email, token: userDatas.body.token}
        }
        else{
            console.log(response.statusText)
        }
    }catch(error){
        console.log(error)
    }
})

export const authSlice = createSlice({
    name : 'auth', // so slice state will be reached through store.auth
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
        setToken : (state, action) => {
            const {token} = action.payload
            return {...state, token: token}
        },
        logout : () => {
            return initialState
        },
        setAPIAtWork : (state) => {
            return {...state, loading : 'pending'}
        },
        setAPIIdle : (state) => {
            return {...state, loading : 'idle'}
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
            /*const { email, token } = action.payload
            return email && token ? {...state, loading : 'idle', email, token} : {...state, loading : 'idle'}*/
          })
          .addCase(logAttempt.rejected, (state) => {
            return {...state, loading : 'idle'}
          })
    },
})

export const {setCredentials, setToken, setNames, logout, reset, setAPIAtWork, setAPIIdle} = authSlice.actions

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