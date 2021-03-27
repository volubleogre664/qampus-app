import { useSelector, useDispatch } from "react-redux";
import { selectMessages, saveMessage } from "./features/messagesSlice";
import { selectUser, setUser, clearUser, setPath } from "./features/userSlice";

function useMessagesHelpers() {
  const dispatch = useDispatch();

  const dispatchMessage = (action) => {
    switch (action.type) {
      default:
        dispatch(saveMessage(action.payload));
    }
  };

  const messages = useSelector(selectMessages);

  return [messages, dispatchMessage];
}

function useUserHelpers() {
  const dispatch = useDispatch();

  const dispatchUser = (action) => {
    switch (action.type) {
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

      default:
        localStorage.setItem("jwtToken", action.payload.token);
        dispatch(setUser(action.payload));
    }
  };

  const user = useSelector(selectUser);

  return [user, dispatchUser];
}

export { useMessagesHelpers, useUserHelpers };
