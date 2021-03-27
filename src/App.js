import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home.js";
import Chats from "./pages/Chats/Chats.js";
import Profile from "./pages/Profile/Profile.js";
import HeaderMenu from "./pages/HeaderMenu/HeaderMenu.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";

import AuthRoute from "./utils/AuthRoute.js";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <AuthRoute exact path="/login" component={Login} />

          <AuthRoute exact path="/register" component={Register} />

          <Route exact path="/profile" component={Profile} />

          <Route exact path="/chats">
            <HeaderMenu />
            <Chats />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
