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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const jsonUrl = "http://127.0.0.1/photographers.json"

export const getPhotographers = createAsyncThunk('api/getsomething', () => {
    return fetch(jsonUrl).then((res) => res.json()).catch((err) => console.log(err))
})

const apiSlice = createSlice({
    name : 'api',
    initialState : {auth: '', photographers: [], isLoading: true},
    reducers: {
        clearCart: (state : any) => {
          state.auth = []
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getPhotographers.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getPhotographers.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.photographers = action.payload;
          })
          .addCase(getPhotographers.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
          });
      },
})
