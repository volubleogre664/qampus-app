import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { io } from "socket.io-client";
import Home from "@pages/Home/Home.js";

import Chats from "@pages/Chats/Chats.js";
import Register from "@pages/Register/Register.js";
import Login from "@pages/Login/Login.js";
import Profile from "@components/Profile";
import EditProfile from "@components/EditProfile";
import NewUser from "@components/NewUser";
import MsgBox from "@components/MessageBox";
import InstallPrompt from "@components/InstallPrompt";

import Collection from "@pages/Collection/Collection.js";
import Navigation from "@pages/Navigation/Navigation.js";
import Help from "@pages/Help/Help.js";
import HeaderMenu from "@components/HeaderMenu";
import CropImage from "@components/CropImage";
import AuthRoute from "@utils/AuthRoute.js";
import PrivateRoute from "@utils/PrivateRoute.js";
import {
  useMessagesSlice,
  useUserSlice,
  useUtilsSlice,
} from "@redux/getSlices.js";
import { firebaseConfig } from "./config.js";
import "./App.css";

const app = initializeApp(firebaseConfig);

// const serverUrl = "http://localhost:8080";
const serverUrl = "https://server.qampus.co.za/";

function App() {
  const [{ imgCrop, user, installPrompt }, dispatchUser] = useUserSlice();
  const [
    {
      popup: { popupShow },
    },
  ] = useUtilsSlice();
  const [, dispatchMessage] = useMessagesSlice();

  useEffect(() => {
    if (!user?.id) return;

    const socket = io(serverUrl, {
      query: {
        user: user.id,
        origin: "https://qampus.co.za",
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
      dispatchMessage({
        payload: message.newMessage,
      });

      let chatsDiv = document.querySelector(".chats__mainSectionBody");
      chatsDiv.scrollTop = chatsDiv.scrollHeight;
    });
  }, [user?.id, dispatchUser, dispatchMessage]);

  return (
    <div className="app">
      <Router>
        {imgCrop.imgSrc && <CropImage />}
        {popupShow && <MsgBox />}
        {user && <Profile />}
        {user?.edit && <EditProfile app={app} />}
        {installPrompt && <InstallPrompt />}
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
