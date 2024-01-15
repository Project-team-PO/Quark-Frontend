import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/api.slice'
import authReducer from './slices/auth.slice'
import usersReducer from './slices/user.slice'
import announcementReducer from './slices/announcement.slice'
import favouritesReducer from './slices/favourites.slice'
import languageSlice from './slices/language.slice'
import tourSlice from './slices/tour.slice'

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    language: languageSlice,
    announcement: announcementReducer,
    favourites: favouritesReducer,
    tour: tourSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})