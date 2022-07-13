import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

if (localStorage.getItem("messages")) {
  initialState.messages = JSON.parse(localStorage.getItem("messages"));
}

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    saveMessage(state, action) {
      if (action.payload === null) return;

      if (state.messages.find((item) => item.id === action.payload.id)) return;

      if (Array.isArray(action.payload)) {
        action.payload.forEach((msg) => {
          if (!state.messages.find((item) => item.id === msg.id)) {
            state.messages.push(msg);
          }
        });

        // state.messages = [...state.messages, ...action.payload];
      } else {
        state.messages.push(action.payload);
      }

      if (localStorage.getItem("messages")) {
        localStorage.removeItem("messages");
      }

      localStorage.setItem("messages", JSON.stringify(state.messages));
    },
    removeMessages(state) {
      state.messages = [];
      localStorage.removeItem("messages");
    },
  },
});

export const { saveMessage, removeMessages } = messagesSlice.actions;
export const selectMessages = (state) => state.messages.messages;
export default messagesSlice.reducer;
