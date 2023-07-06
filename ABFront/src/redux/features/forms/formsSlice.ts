/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState : formsState = {
    loginError : false,
    editNamesError : false,
}

export const formsSlice = createSlice({
    name : 'forms', // this slice sub state will be reached through store.auth
    initialState,
    reducers : {
        // action : reducer fn
        reset : () => {
            return initialState
        },
        setLoginError : (state, action) => {
            const { errorBoolean } = action.payload
            return {...state, loginError : errorBoolean}
        },
        setEditNamesError : (state, action) => {
            const { errorBoolean } = action.payload
            return {...state, editNamesError : errorBoolean}
        },
    },
})

export const {setLoginError, setEditNamesError, reset} = formsSlice.actions

export default formsSlice.reducer

interface formsState{
    loginError : boolean
    editNamesError : boolean
}