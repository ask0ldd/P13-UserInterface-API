/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface authState{
    logged : boolean
    user : string | null
    token : string | null
    working : boolean
}

const initialState : authState = {
    logged : false,
    user : null,
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
            const { user, token } = action.payload
            return {...state, logged : true, user : user, token : token, working : true }
        },
        logout : () => {
            return {logged : false, user: null, token: null, working: false}
        },
        setAPIAtWork : (state) => {
            return {...state, working: true}
        },
        setAPIIdle : (state) => {
            return {...state, working: false}
        }
    }
})

export const {setCredentials, logout, reset, setAPIAtWork, setAPIIdle} = authSlice.actions

export default authSlice.reducer