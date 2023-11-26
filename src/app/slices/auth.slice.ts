import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState: localStorage.getItem("userState")
    ? JSON.parse(localStorage.getItem("userState")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userState = action.payload;
      localStorage.setItem("userState", JSON.stringify(action.payload));
    },
    updateCredentials: (state, action) => {
      state.userState.user = action.payload;
      localStorage.setItem("userState", JSON.stringify(state.userState))
    },
    SignOut: (state, _) => {
      state.userState = null;
      localStorage.removeItem("userState");
    },
  },
});

export const { setCredentials, SignOut, updateCredentials } = authSlice.actions;

export default authSlice.reducer;
