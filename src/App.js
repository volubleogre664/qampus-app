import React, { useState } from "react";
import Home from "./Home/Home.js";
import Chats from "./Chats/Chats.js";
import Profile from "./Profile/Profile.js";
import HeaderMenu from "./HeaderMenu/HeaderMenu.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login/Login.js";
import "./App.css";

function App() {
  const [loggedIn] = useState(true);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            {!loggedIn ? <Redirect to="/login" /> : <Home />}
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/chats">
            <HeaderMenu />
            <Chats />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
