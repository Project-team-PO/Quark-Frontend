import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/api.slice'

import authReducer from './slices/auth.slice'
import usersReducer from './slices/user.slice'
import announcementReducer from './slices/announcement.slice'
import conversationsReducer from './slices/conversations.slice'
import languageSlice from './slices/language.slice'
import tourSlice from './slices/tour.slice'
import messagesReducer from './slices/messages.slice'

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    language: languageSlice,
    announcement: announcementReducer,
    conversations: conversationsReducer,
    tour: tourSlice,
    messages: messagesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})