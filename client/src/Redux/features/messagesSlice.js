import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    saveMessage(state, action) {
      if (Array.isArray(action.payload)) {
        state.messages = [...state.messages, ...action.payload];
      } else {
        state.messages.push(action.payload);
      }
    },
  },
});

export const { saveMessage } = messagesSlice.actions;
export const selectMessages = (state) => state.messages.messages;
export default messagesSlice.reducer;
