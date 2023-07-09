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
            if(action.payload.hasValidationFailed == null) return {...state}
            return {...state, loginFailedValidation : action.payload.hasValidationFailed}
        },
        setEditNamesError : (state, action) => {
            if(action.payload.hasValidationFailed == null) return {...state}
            return {...state, editNamesFailedValidation : action.payload.hasValidationFailed}
        },
    },
})

export const {setLoginError, setEditNamesError, reset} = formsSlice.actions

export default formsSlice.reducer

interface formsState{
    loginFailedValidation : boolean
    editNamesFailedValidation : boolean
}