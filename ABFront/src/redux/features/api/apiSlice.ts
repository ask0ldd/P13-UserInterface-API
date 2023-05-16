import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UsersState {
    entities: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    entities: [],
    loading: 'idle',
} as UsersState

export const getAccounts = createAsyncThunk('api/getAccounts', () => {
    const jsonUrl = "/accounts.json"
    return fetch(jsonUrl).then((res) => res.json()).catch((err) => console.log(err))
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

/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setCredentials, logout } from '../auth/authSlice'
// import { RootState } from '../../store'

const baseQuery = fetchBaseQuery({
    baseUrl : 'http://127.0.0.1:3001/api/v1/',
    credentials : 'include', // cookie sent with every query
    prepareHeaders : (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({ baseUrl : 'http://127.0.0.1:3001/api/v1/user/' }),
    endpoints : (builder) => ({
        login : builder.query({
            query : () => 'login',
        })
    })
})

export const { useLoginQuery } = apiSlice*/