/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface authState{
    logged : boolean
    user : string | null
    token : string | null
}

const initialState : authState = {
    logged : false,
    user : 'john doe',
    token : null,
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
            return {...state, logged : true, user : user, token : token }
        },
        logout : () => {
            return {logged : false, user: null, token: null}
        },
    }
})

export const {setCredentials, logout, reset} = authSlice.actions

export default authSlice.reducer