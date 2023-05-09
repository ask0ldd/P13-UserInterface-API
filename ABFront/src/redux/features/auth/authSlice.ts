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
        setUser : (state) => {
            return state
        },
        setToken : (state) => {
            return state
        },
    }
})

export const {setUser, setToken} = authSlice.actions

export default authSlice.reducer