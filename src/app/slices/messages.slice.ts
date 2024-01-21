import { createSlice } from "@reduxjs/toolkit";
import { IMessageGroup } from "../../ts/interfaces";

const initialState = {
  messages: [] as IMessageGroup[],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload as IMessageGroup);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
