/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface authState{
    user : string
    token : string
}

const initialState : authState = {
    user : 'john doe',
    token : '',
}

export const authSlice = createSlice({
    name : 'auth', // state will be reached through store.auth
    initialState,
    reducers : {
        reset : () => {
            return initialState
        },
        setUser : (state, action) => {
            return {...state, user : action.payload}
        },
        setToken : (state, action) => {
            return {...state, token : action.payload}
        },
    }
})

export const {setUser, setToken, reset} = authSlice.actions

export default authSlice.reducer