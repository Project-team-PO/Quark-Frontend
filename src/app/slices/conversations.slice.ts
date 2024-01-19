import { createSlice } from "@reduxjs/toolkit";
import { IConversation } from "../../ts/interfaces";

const initialState = {
  conversations: [] as IConversation[],
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload as IConversation);
    },
  },
});

export const { setConversations, addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
