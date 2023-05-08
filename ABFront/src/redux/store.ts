import { configureStore } from "@reduxjs/toolkit"
//import { PayloadAction } from "@reduxjs/toolkit"

const logsReducer = () => {
    return
}

const userInfosReducer = () => {
    return
}

export const store = configureStore({
    reducer: {
      logs: logsReducer,
      userInfos: userInfosReducer,
    },
  })

// export those types so they can be used in globally
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store