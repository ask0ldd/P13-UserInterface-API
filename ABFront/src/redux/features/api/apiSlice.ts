import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MockAPIAccounts } from "../../../services/API";

interface UsersState {
    statements: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    statements: [],
    loading: 'idle',
} as UsersState

export const getAccountsStatements = createAsyncThunk('api/getAccountsStatements', async () => {
    return await MockAPIAccounts.getAccounts()
})

export const apiSlice = createSlice({
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

// export const {getSt} = apiSlice.actions

export default apiSlice.reducer