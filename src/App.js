import React from "react";
import Home from './Home/Home.js';
import Chats from "./Chats/Chats.js";
import Profile from  "./Profile/Profile.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
	  <Route exact path="/">
	    <Home />
            <Link to="/profile">Profile</Link>
	  </Route>

	  <Route path="/profile">
	    <Profile />
	  </Route>

	  <Route path="/chats">
	    <Chats />
	  </Route>
	</Switch>
      </Router>
    </div>
  );
}

export default App;
