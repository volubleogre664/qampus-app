import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { io } from "socket.io-client";
import Home from "@pages/Home/Home.js";
// import Profile from "@pages/Profile/Profile.js";
// import FinaliseRegister from "@pages/Register/FinaliseRegister.js";

import Chats from "@pages/Chats/Chats.js";
import Register from "@pages/Register/Register.js";
import NewLogin from "@pages/Login/Login.js";
import NewProfile from "@pages/Profile/NewProfile.js";
import EditProfile from "@pages/Profile/EditProfile.js";
import NewUser from "@components/NewUser";
import MsgBox from "@components/MessageBox";

import Collection from "@pages/Collection/Collection.js";
import Navigation from "@pages/Navigation/Navigation.js";
import Upload from "@pages/Upload/Upload.js";
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
const serverUrl = "http://qampus-app.herokuapp.com:8080";

function App() {
  const [{ imgCrop, user }, dispatchUser] = useUserSlice();
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
        // origin: "http://localhost:3000",
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

    return () => socket.disconnect();
  }, [user?.id, dispatchUser, dispatchMessage]);

  return (
    <div className="app">
      <Router>
        {imgCrop.imgSrc && <CropImage />}
        {popupShow && <MsgBox />}
        <NewProfile />
        <EditProfile app={app} />
        <Switch>
          {/* These are public pages... Accessible to everyone */}
          <Route exact path="/">
            {/* <NewUser /> */}
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
          {/* AuthRoute checks if someone is logged in and redirects to home if they are logged in */}
          {/* No one will open login, register and finalise register without loggin out */}
          <AuthRoute exact path="/login" component={NewLogin} />
          <AuthRoute exact path="/register" component={Register} />

          {/* PrivateRoute is for private pages that needs login to be accessed. */}
          {/* For development purposes just rename PrivateRoute to Route */}
          {/* <Route exact path="/register/finalise">
            <FinaliseRegister />
          </Route> */}

          {/* <Route exact path="/landing" component={Landing} /> */}

          {/* <PrivateRoute exact path="/profile">
            <HeaderMenu />
            <Profile />
          </PrivateRoute> */}

          <PrivateRoute exact path="/chats*">
            <HeaderMenu />
            <Chats />
          </PrivateRoute>

          <PrivateRoute exact path="/upload">
            <HeaderMenu />
            <Upload app={app} />
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
