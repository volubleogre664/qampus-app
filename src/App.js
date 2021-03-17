import React from "react";
import Home from "./Home/Home.js";
import Chats from "./Chats/Chats.js";
import Profile from "./Profile/Profile.js";
import HeaderMenu from "./HeaderMenu/HeaderMenu.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/Login.js";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
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
