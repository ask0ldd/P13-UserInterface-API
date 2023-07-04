import { configureStore } from "@reduxjs/toolkit"
//import { PayloadAction } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import accountsReducer from './features/accounts/accountsSlice'
// import mockAccountsAPIReducer from './features/api/mockAccountsAPISlice'

export const store = configureStore({
    reducer: {
      auth : authReducer,
      accounts : accountsReducer,
      /*api : mockAccountsAPIReducer,*/
    },
    devTools : true,
  })

// export those types so they can be used globally : to type some redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store