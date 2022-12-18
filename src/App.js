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
// import InstallPrompt from "@components/InstallPrompt";

import Collection from "@pages/Collection/Collection.js";
import Navigation from "@pages/Navigation/Navigation.js";
import Help from "@pages/Help/Help.js";
import HeaderMenu from "@components/HeaderMenu";
import CropImage from "@components/CropImage";
import AuthRoute from "@utils/AuthRoute.js";
import PrivateRoute from "@utils/PrivateRoute.js";
// import useGQL from "./utils/graphqlHooks.js";
// import { LOGIN_USER } from "./utils/graphql.js";
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
  // const { isAuthenticated, user: authUser } = useAuth0();
  const [{ imgCrop, user, installPrompt }, dispatchUser] = useUserSlice();
  const [
    {
      popup: { popupShow },
    },
    dispatchUtils,
  ] = useUtilsSlice();
  const [, dispatchMessage] = useMessagesSlice();

  // const [getUserData] = useGQL({
  //   type: "mutation",
  //   query: LOGIN_USER,
  //   onSuccess: (_, { data: { login: userData } }) => {
  //     // setError(false);
  //     // setLoading(false);
  //     // let jwt = jwtDecode(userData.token);
  //     // let isSecureAuth = jwt.permissions.includes("auth:secure_password");

  //     dispatchUser({
  //       type: "SET_USER",
  //       payload: { ...userData, edit: false, secure: false },
  //     });

  //     console.log("The data from the server", userData);

  //     // history.push("/");
  //   },
  //   onError: (err) => {
  //     // setError(true);
  //     console.log(err);
  //     // setLoading(false);
  //   },
  // });

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

      document.getElementById(message.id).scrollIntoView();
    });
  }, [user?.id, dispatchUser, dispatchMessage]);

  // useEffect(() => {
  //   console.log("The user mate", user);

  //   if (!isAuthenticated && user === null) return;
  //   else if (isAuthenticated && user === null) {
  //     console.log("we got here");
  //     // setLoading(true);
  //     getUserData({ variables: { email: authUser.email, password: "1234" } });
  //   }
  // }, [getUserData, isAuthenticated, user]);

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
