/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface accountState{
    accountType: string
    accountId: string 
    balance: number 
    balanceStatus: string
}

const initialState : Array<accountState> = []

export const accountsSlice = createSlice({
    name : 'accounts', // so slice state will be reached through store.auth
    initialState,
    reducers : {
        setAccountState : (state, action) => {
            let newState = [...state]
            newState = initialState
            return newState[0] = action.payload
        },
        pushAccountState : (state, action) => {
            const newState = [...state]
            newState.push(action.payload)
            return newState
        },
    }
})

export default accountsSlice.reducer