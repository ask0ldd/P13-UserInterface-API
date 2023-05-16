import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAccounts } from "../../../services/API";

interface UsersState {
    statements: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    statements: [],
    loading: 'idle',
} as UsersState

export const getAccountsStatements = createAsyncThunk('api/getAccountsStatements', async () => {
    return await APIAccounts.getAccounts()
})

export const apiSlice = createSlice({
    name : 'api',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAccountsStatements.pending, (state) => {
            // state.loading = 'pending'
            return {...state, loading : 'pending'}
          })
          .addCase(getAccountsStatements.fulfilled, (state, action) => {
            /*state.statements = action.payload
            console.log(action.payload)
            state.loading = 'idle'*/
            return {...state, loading : 'idle', statements : action.payload}
          })
          .addCase(getAccountsStatements.rejected, (state) => {
            // console.log(action.payload)
            return {...state, loading : 'idle'}
          })
      },
})

export default apiSlice.reducer