import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useAuth0 } from "@auth0/auth0-react";
import { io } from "socket.io-client";

import Home from "@pages/Home/Home.js";
import Chats from "@pages/Chats/Chats.js";
import Register from "@pages/Register/Register.js";
import Login from "@pages/Login/Login.js";
import Profile from "@components/Profile";
import EditProfile from "@components/EditProfile";
import NewUser from "@components/NewUser";
import MsgBox from "@components/MessageBox";
import Collection from "@pages/Collection/Collection.js";
import Navigation from "@pages/Navigation/Navigation.js";
import Help from "@pages/Help/Help.js";
import HeaderMenu from "@components/HeaderMenu";
import CropImage from "@components/CropImage";
import AuthRoute from "@utils/AuthRoute.js";
import PrivateRoute from "@utils/PrivateRoute.js";
import { config } from "./config.js";
import {
  useMessagesSlice,
  useUserSlice,
  useUtilsSlice,
} from "@redux/getSlices.js";
import "./App.css";

const app = initializeApp(config.firebaseConfig);

function App() {
  const { isAuthenticated } = useAuth0();
  const [{ imgCrop, user }, dispatchUser] = useUserSlice();
  const [
    {
      popup: { popupShow },
    },
  ] = useUtilsSlice();
  const [, dispatchMessage] = useMessagesSlice();

  useEffect(() => {
    if (!user?.id) return;

    const socket = io(config.serverUrl, {
      query: {
        user: user.id,
        origin: config.clientUrl,
        // Credential: true,
      },
    });

    socket.on("USER_CONTACT_UPDATE", (userContact) => {
      dispatchUser({
        type: "ADD_USER_CONTACT",
        payload: userContact.contact,
      });
    });

    socket.on("NEW_MESSAGE", (message) => {
      if (
        user?.blockedContacts &&
        user.blockedContacts.includes(message.from)
      ) {
        return;
      }

      dispatchMessage({
        payload: message.newMessage,
      });

      let chatsDiv = document.querySelector(".chats__mainSectionBody");
      chatsDiv.scrollTop = chatsDiv.scrollHeight;
    });
  }, [user?.id, dispatchUser, dispatchMessage, user?.blockedContacts]);

  useEffect(() => {
    let auth = localStorage.getItem("auth");
    if (!isAuthenticated && auth === "yes") {
      localStorage.removeItem("auth");
    }
  }, [isAuthenticated]);

  return (
    <div className="app">
      <Router>
        {imgCrop.imgSrc && <CropImage />}
        {popupShow && <MsgBox />}
        {user && <Profile />}
        {user?.edit && <EditProfile app={app} />}
        {/* {installPrompt && <InstallPrompt />} */}
        <Switch>
          {/* These are public pages... Accessible to everyone */}
          <Route exact path="/">
            {user?.newUser && <NewUser app={app} />}
            <HeaderMenu />
            <Home />
          </Route>
          <Route exact path="/navigation">
            <HeaderMenu />
            <Navigation />
          </Route>
          <Route exact path="/help">
            <HeaderMenu />
            <Help />
          </Route>

          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />

          <PrivateRoute exact path="/chats*">
            <HeaderMenu />
            <Chats />
          </PrivateRoute>

          <PrivateRoute exact path="/collection">
            <HeaderMenu />
            <Collection app={app} />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
