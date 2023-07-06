/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState : formsState = {
    loginFailedValidation : false,
    editNamesFailedValidation : false,
}

export const formsSlice = createSlice({
    name : 'forms', // this slice sub state will be reached through store.forms
    initialState,
    reducers : {
        // action : reducer fn
        reset : () => {
            return initialState
        },
        setLoginError : (state, action) => {
            const { hasValidationFailed } = action.payload
            return {...state, loginFailedValidation : hasValidationFailed}
        },
        setEditNamesError : (state, action) => {
            const { hasValidationFailed } = action.payload
            return {...state, editNamesFailedValidation : hasValidationFailed}
        },
    },
})

export const {setLoginError, setEditNamesError, reset} = formsSlice.actions

export default formsSlice.reducer

interface formsState{
    loginFailedValidation : boolean
    editNamesFailedValidation : boolean
}