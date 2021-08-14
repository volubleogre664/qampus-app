import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import { io } from "socket.io-client";

import Home from "./pages/Home/Home.js";
import Chats from "./pages/Chats/Chats.js";
import Profile from "./pages/Profile/Profile.js";
import FinaliseRegister from "./pages/Register/FinaliseRegister.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Collection from "./pages/Collection/Collection.js";
import Navigation from "./pages/Navigation/Navigation.js";
import Upload from "./pages/Upload/Upload.js";
import Help from "./pages/Help/Help.js";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu.js";
import CropImage from "./components/CropImage/CropImage.js";
import AuthRoute from "./utils/AuthRoute.js";
import PrivateRoute from "./utils/PrivateRoute.js";
import { useUserHelpers } from "./Redux/getSlices.js";
import { firebaseConfig } from "./config.js";
import "./App.css";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);

function App() {
  const [{ imgCrop, user }, dispatchUser] = useUserHelpers();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const socket = io("https://server.qampus.co.za", {
      query: {
        user: user.id,
      },
    });

    socket.on("USER_CONTACT_UPDATE", (userContact) => {
      dispatchUser({
        type: "ADD_USER_CONTACT",
        payload: userContact.contact,
      });
    });

    setSocket(socket);

    return () => socket.disconnect();
  }, [user?.id, setSocket]);

  return (
    <div className="app">
      <Router>
        {/* <MessageBox errors={errors} /> */}
        {imgCrop.imgSrc && <CropImage />}
        <Switch>
          {/* These are public pages... Accessible to everyone */}
          <Route exact path="/" component={Home} />
          <Route exact path="/navigation">
            <HeaderMenu />
            <Navigation />
          </Route>

          {/* AuthRoute checks if someone is logged in and redirects to home if they are logged in */}
          {/* No one will open login, register and finalise register without loggin out */}
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />

          {/* PrivateRoute is for private pages that needs login to be accessed. */}
          {/* For development purposes just rename PrivateRoute to Route */}
          <PrivateRoute exact path="/register/finalise">
            <FinaliseRegister />
          </PrivateRoute>

          <PrivateRoute exact path="/profile">
            <HeaderMenu />
            <Profile />
          </PrivateRoute>

          <PrivateRoute exact path="/chats*">
            <HeaderMenu />
            <Chats socket={socket} />
          </PrivateRoute>

          <PrivateRoute exact path="/upload">
            <HeaderMenu />
            <Upload />
          </PrivateRoute>

          <PrivateRoute exact path="/collection">
            <HeaderMenu />
            <Collection />
          </PrivateRoute>
        </Switch>
        <Route exact path="/help">
          <HeaderMenu />
          <Help />
        </Route>
      </Router>
    </div>
  );
}

export default App;
