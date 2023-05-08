import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : '',
    token : '',
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        log : (state) => {
            return state
        },
        unlog : (state) => {
            return state
        },
    }
})

export const {log, unlog} = authSlice.actions

export default authSlice.reducer