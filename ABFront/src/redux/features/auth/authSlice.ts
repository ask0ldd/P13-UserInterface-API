/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface authState{
    user : string | null
    token : string | null
}

const initialState : authState = {
    user : 'john doe',
    token : null,
}

export const authSlice = createSlice({
    name : 'auth', // state will be reached through store.auth
    initialState,
    reducers : {
        reset : () => {
            return initialState
        },
        setCredentials : (state, action) => {
            const { user, token } = action.payload
            return { user : user, token : token }
        },
        logout : () => {
            return {user: null, token: null}
        },
    }
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer