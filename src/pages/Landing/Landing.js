import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../Login/logo1.png";
import "./Landing.css";

function Landing() {
  const history = useHistory();

  const logoClicked = () => history.push("/");

  return (
    <div className="landing">
      <header className="landing__header">
        <div
          role="link"
          aria-roledescription="Clicking here sends you to home page"
          onClick={logoClicked}
          className="logoContainer"
        >
          <img src={logo} alt="qampus" />
          <h2>Qampus</h2>
        </div>

        <nav className="landing__headerNav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/help#about">About</Link>
            </li>
            <li>
              <Link to="/help#help">Help</Link>
            </li>
            <li>
              <a href="#getStarted">Sign up</a>
              <a href="#getStarted">Log in</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="landing__main">Our main page yos</main>

      <footer className="landing__footer">Our footer bro</footer>
    </div>
  );
}

export default Landing;
