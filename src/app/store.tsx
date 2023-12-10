import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/api.slice'
import authReducer from './slices/auth.slice'
import usersReducer from './slices/user.slice'
import announcementReducer from './slices/announcement.slice'

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    announcement: announcementReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})