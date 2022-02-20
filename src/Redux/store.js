import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./features/messagesSlice";
import userReducer from "./features/userSlice";
import bookReducer from "./features/booksSlice";
import utilsReducer from "./features/utilsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    messages: messagesReducer,
    utils: utilsReducer,
  },
  // devTools: false,
});
