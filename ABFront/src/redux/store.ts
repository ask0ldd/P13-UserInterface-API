import { configureStore } from "@reduxjs/toolkit"
//import { PayloadAction } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'

/*const logsReducer = () => {
    return
}

const userInfosReducer = () => {
    return
}*/

export const store = configureStore({
    reducer: {
      auth : authReducer,
    },
  })

// export those types so they can be used globally
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store