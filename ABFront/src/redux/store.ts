import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import accountsReducer from './features/accounts/accountsSlice'
import formsReducer from './features/forms/formsSlice'

export const store = configureStore({
    reducer: {
      auth : authReducer,
      accounts : accountsReducer,
      forms : formsReducer
    },
    devTools : true,
  })

// export those types so they can be used globally : to type some redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store