import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  announcements: [
    {
      title: "Announcement #1",
      content: "This is an example.",
      userFirstName: "John",
      userLastName: "Doe",
      userPictureUrl: 
        "https://gravatar.com/avatar/1c8e8a6e8d1fe52b782b280909abeb38?s=400&d=robohash&r=x",
      time: "12/12/2023",
    },
  ],
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    addAnnouncement: (state, action) => {
      state.announcements.push(action.payload);
    },
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
    }
  },
});

export const { addAnnouncement, setAnnouncements } = announcementSlice.actions;

export default announcementSlice.reducer;
