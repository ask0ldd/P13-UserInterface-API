import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MockAPIAccounts } from "../../../services/API";

const initialState = {
    statements: [],
    loading: 'idle',
} as AccountsState

export const getAccountsStatements = createAsyncThunk('api/getAccountsStatements', async () => {
    return await MockAPIAccounts.getAccounts() // Mocking the endpoints that don't need to be implemented yet
})

export const mockAccountsAPISlice = createSlice({
    name : 'api',
    initialState,
    reducers: {
        // getSt : (state) => state,
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAccountsStatements.pending, (state) => {
            return {...state, loading : 'pending'}
          })
          .addCase(getAccountsStatements.fulfilled, (state, action) => {
            return {...state, loading : 'idle', statements : action.payload}
          })
          .addCase(getAccountsStatements.rejected, (state) => {
            return {...state, loading : 'idle'}
          })
      },
})

// export const {getSt} = mockAccountsAPISlice.actions

export default mockAccountsAPISlice.reducer

interface AccountsState {
  statements: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}