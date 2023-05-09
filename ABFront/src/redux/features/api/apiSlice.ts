import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl : 'http://127.0.0.1:3001/api/v1/',
    credentials : 'include', // cookie sent with every query
    prepareHeaders : (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
    },
})