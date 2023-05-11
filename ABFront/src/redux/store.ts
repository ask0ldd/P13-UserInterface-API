import { configureStore } from "@reduxjs/toolkit"
//import { PayloadAction } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
      auth : authReducer,
    },
    devTools : true,
  })

// export those types so they can be used globally : to type some redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store