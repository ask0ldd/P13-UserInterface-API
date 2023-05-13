/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface authState{
    logged : boolean
    id : string | null
    email : string | null
    token : string | null
    working : boolean
}

const initialState : authState = {
    logged : false,
    id : null,
    email : null,
    token : null,
    working : false
}

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
            return {...state, logged: true, email: email, token: token, working: true }
        },
        logout : () => {
            return {logged: false, id: null, email: null, token: null, working: false}
        },
        setAPIAtWork : (state) => {
            return {...state, working: true}
        },
        setAPIIdle : (state) => {
            return {...state, working: false}
        },
    }
})

export const {setCredentials, logout, reset, setAPIAtWork, setAPIIdle} = authSlice.actions

export default authSlice.reducer