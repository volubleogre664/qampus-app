import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";

import Home from "./pages/Home/Home.js";
import Chats from "./pages/Chats/Chats.js";
import Profile from "./pages/Profile/Profile.js";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu.js";
import FinaliseRegister from "./pages/Register/FinaliseRegister.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import UploadCollection from "./pages/Upload_Collection/UploadCollection.js";
import AuthRoute from "./utils/AuthRoute.js";

import MessageBox from "./components/MessageBox/MessageBox.js";
import CropImage from "./components/CropImage/CropImage.js";

import { useUserHelpers } from "./Redux/getSlices.js";
import { firebaseConfig } from "./config.js";

import "./App.css";
import Collection from "./pages/Collection/Collection.js";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);

function App() {
  const [{ errors, imgCrop }] = useUserHelpers();

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
          <Route exact path="/profile">
            <HeaderMenu />
            <Profile />
          </Route>
          <Route exact path="/chats">
            <HeaderMenu />
            <Chats />
          </Route>
          <Route exact path="/upload">
            <HeaderMenu />
            <UploadCollection />
          </Route>
          <Route exact path="/collection">
            <HeaderMenu />
            <Collection/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
