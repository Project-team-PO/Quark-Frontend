import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [
        { name: 'Yami', id: 1 },
        { name: 'Kayzz', id: 2 },
        { name: 'korekso', id: 3 },
        { name: 'Kacper Mańczyk', id: 4},
        { name: 'Damian Nussbaum', id: 5},
        
        ],
  },
    reducers: {
        addUser: (state, action) => {
        state.users.push(action.payload)
        },
        removeUser: (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload)
        },
    },
});




// Action creators are generated for each case reducer function
export const { addUser, removeUser } = usersSlice.actions



export default usersSlice.reducer