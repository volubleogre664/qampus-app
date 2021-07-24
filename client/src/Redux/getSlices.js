import { useSelector, useDispatch } from "react-redux";
import {
  selectMessages,
  saveMessage,
  removeMessages,
} from "./features/messagesSlice";
import {
  selectUser,
  setUser,
  clearUser,
  setPath,
  setErrors,
  setImgSrc,
  addUserContact,
} from "./features/userSlice";

import {
  selectBooks,
  setBook,
  setBookCover,
  setBookList,
  setSearchBookList,
} from "./features/booksSlice";

// Hook for messeges state and all the things related to messages
function useMessagesHelpers() {
  const dispatch = useDispatch();

  const dispatchMessage = (action) => {
    switch (action?.type) {
      case "CLEAR_MESSAGES": {
        dispatch(removeMessages());
        break;
      }

      default:
        dispatch(saveMessage(action.payload));
    }
  };

  const messages = useSelector(selectMessages);

  return [messages, dispatchMessage];
}

//The hook for handling users state information and everything about them
function useUserHelpers() {
  const dispatch = useDispatch();

  const dispatchUser = (action) => {
    switch (action?.type) {
      case "CLEAR_USER": {
        dispatch(clearUser(action.payload));
        break;
      }

      case "SET_USER": {
        localStorage.setItem("jwtToken", action.payload.token);
        dispatch(setUser(action.payload));
        break;
      }

      case "SET_PATH": {
        dispatch(setPath(action.payload));
        break;
      }

      case "SET_ERRORS": {
        dispatch(setErrors(action.payload));
        break;
      }

      case "SET_CROP_IMG": {
        dispatch(setImgSrc(action.payload));
        break;
      }

      case "REMOVE_USER": {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        dispatch(setUser(null));
        break;
      }

      case "ADD_USER_CONTACT": {
        dispatch(addUserContact(action.payload));

        break;
      }

      default:
        localStorage.setItem("jwtToken", action.payload.token);
        dispatch(setUser(action.payload));
    }
  };

  const user = useSelector(selectUser);

  return [user, dispatchUser];
}

// Hook for dealing with books state and everything with books around the app
function useBooksHelpers() {
  const dispatch = useDispatch();

  const dispatchBooks = (action) => {
    switch (action?.type) {
      case "SET_BOOK": {
        dispatch(setBook(action.payload));
        break;
      }

      case "SET_BOOK_COVER": {
        dispatch(setBookCover(action.payload));
        break;
      }

      case "SET_LIBRARY_BOOK_LIST": {
        dispatch(setBookList(action.payload));
        break;
      }

      case "SET_SEARCH_BOOK_LIST": {
        dispatch(setSearchBookList(action.payload));
        break;
      }

      default:
        return;
    }
  };
  const books = useSelector(selectBooks);

  return [books, dispatchBooks];
}

export { useMessagesHelpers, useUserHelpers, useBooksHelpers };
