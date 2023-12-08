import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/api.slice'
import authReducer from './slices/auth.slice'
import usersReducer from './slices/usersSlice'
import languageSlice from './slices/language.slice'

export default configureStore({
  reducer: {
    users: usersReducer,
    language: languageSlice,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})