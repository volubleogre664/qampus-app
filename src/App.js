import React, {useState} from "react";
import Home from './Home/Home.js';
import Chats from "./Chats/Chats.js";
import Profile from  "./Profile/Profile.js";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from "./Login/Login.js";
import SideMenu from "./SideMenu/SideMenu.js"; 
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
	  </Route>

	  <Route exact path="/">
	    <Home />
	  </Route>

	  <Route path="/profile">
	    <Profile />
	  </Route>

	  <Route path="/chats">
	    <SideMenu />
	    <Chats />
	    <Profile />
	  </Route>
	</Switch>
      </Router>
    </div>
  );
}

export default App;
