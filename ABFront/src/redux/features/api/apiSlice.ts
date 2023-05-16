import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAccounts } from "../../../services/API";

interface UsersState {
    entities: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    entities: [],
    loading: 'idle',
} as UsersState

export const getAccounts = createAsyncThunk('api/getAccounts', async () => {
    const response = await APIAccounts.getAccounts()
    return response
})

const apiSlice = createSlice({
    name : 'api',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAccounts.pending, (state) => {
            state.loading = 'pending'
          })
          .addCase(getAccounts.fulfilled, (state, action) => {
            state.entities = action.payload
            console.log(action.payload)
            state.loading = 'idle'
          })
          .addCase(getAccounts.rejected, (state, action) => {
            console.log(action.payload)
            state.loading = 'idle'
          });
      },
})