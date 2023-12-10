import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [
      { id: 1, email: "XD", firstName: "XD", lastName: "XD", pictureUrl: "XDD" },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, setUsers } = usersSlice.actions

export default usersSlice.reducer