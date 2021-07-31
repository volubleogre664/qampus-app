import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";

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
  const [{ imgCrop }] = useUserHelpers();

  return (
    <div className="app">
      <Router>
        {/* <MessageBox errors={errors} /> */}
        {imgCrop.imgSrc && <CropImage />}
        <Switch>
          <Route exact path="/" component={Home} />

          {/* AuthRoute checks if someone is logged in and redirects to home if they are logged in */}
          {/* No one will open login, register and finalise register without loggin out */}
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute
            exact
            path="/register/finalise"
            component={FinaliseRegister}
          />

          {/* PrivateRoute is for private pages that needs login to be accessed. */}
          {/* For development purposes just rename PrivateRoute to Route */}
          <Route exact path="/profile">
            <HeaderMenu />
            <Profile />
          </Route>
          <Route exact path="/chats*">
            <HeaderMenu />
            <Chats />
          </Route>

          <Route exact path="/upload">
            <HeaderMenu />
            <Upload />
          </Route>
          <Route exact path="/navigation">
            <HeaderMenu />
            <Navigation />
          </Route>
          <Route exact path="/collection">
            <HeaderMenu />
            <Collection />
          </Route>
          <Route exact path="/help">
            <HeaderMenu />
            <Help />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
