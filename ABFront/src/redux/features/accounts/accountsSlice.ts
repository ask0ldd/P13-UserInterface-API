/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState : Array<IAccountState> = []

export const accountsSlice = createSlice({
    name : 'accounts', // so slice state will be reached through store.accounts
    initialState,
    reducers : {
        setAccountsState : (_state, action) => {
           const newState : Array<IAccountState> = []
           // console.log('payload', action.payload)
           action.payload.forEach((account : IAccountState) => newState.push(account))
           return newState
        },
        /*pushAccountState : (state, action) => {
            const newState = [...state]
            newState.push(action.payload)
            return newState
        },*/
    }
})

export const {setAccountsState} = accountsSlice.actions

export default accountsSlice.reducer

export interface IAccountState{
    title: string
    lastDigits: string
    amount: string
    amountDescription: string
}