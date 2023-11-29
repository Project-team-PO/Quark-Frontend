import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/api.slice'
import authReducer from './slices/auth.slice'
import usersReducer from './slices/usersSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})