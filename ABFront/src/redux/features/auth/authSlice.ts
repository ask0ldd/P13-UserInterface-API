/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState : authState = {
    logged : false,
    id : null,
    email : null,
    firstname : null,
    lastname : null,
    token : null,
    working : false
}

// setToken


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
            return {...state, working: true}
        },
        setAPIIdle : (state) => {
            return {...state, working: false}
        },
    }
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
    working : boolean
}