import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MockAPIAccounts } from "../../../services/API";

const initialState : IAccountsState = {
    accounts : [],
    loading: 'idle'
}

// Thunk retrieving the active user's accounts statements through the mockAPI
export const getAccountsStatements = createAsyncThunk('api/getAccountsStatements', async () => {
    // Mocking the endpoints that don't need to be implemented yet
    return await MockAPIAccounts.getAccounts()
})

export const accountsSlice = createSlice({
    name : 'accounts', // this slice sub state will be reached through store.accounts
    initialState,
    reducers : {
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAccountsStatements.pending, (state) => {
            return {...state, loading : 'pending'}
          })
          .addCase(getAccountsStatements.fulfilled, (state, action) => {
            return {...state, loading : 'idle', accounts : action.payload}
          })
          .addCase(getAccountsStatements.rejected, (state) => {
            return {...state, loading : 'idle'}
          })
    },
})

export default accountsSlice.reducer

export interface IAccountsState{
    accounts: Array<IAccount>
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export interface IAccount{
    title: string
    lastDigits: string
    amount: string
    amountDescription: string
}