import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: localStorage.getItem("favourites")
    ? JSON.parse(localStorage.getItem("favourites")!)
    : [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourites: (state, action) => {
      state.favourites.push(action.payload);
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
  },
});

export const { addFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
