import React from "react";
import {Button} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import {Link} from "react-router-dom";
import logo from "../logo.png";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <header className="login__header">
        <img className="login__headerLogo" src={logo} alt="qampus logo" />
      </header>

      <main className="login__main">
        <section className="login__mainLeft">
          <h3 className="title">
	    Login to access full features
	  </h3>

	  <form className="form">
	    <div className="form__id">
	      <p>Student number:</p>
	      <input type="text" className="form__idInput" />
	    </div>

	    <div className="form__password">
              <p>Password:</p>
	      <input type="password" className="form__passwordInput" />
	    </div>

	    <div className="form__btns">
              <Button className="form__btnSubmit">
	        Login
	      </Button>
	      <p>Or</p>
	      <Link className="form__signupLink" to="/sign-up">Sign Up</Link> 
	    </div>
	  </form>
	</section>
        
        <div className="login__mainSeparator"></div>

	<section className="login__mainRight">
          <h3 className="title">
            Continue as guest
	  </h3>

	  <Link className="homeLink" to="/">
	    <div className="container">
              <HomeOutlinedIcon />

	      <p>Go to home page</p>
	    </div>
	  </Link>
	</section>
      </main>

      <footer className="login__footer">
        <span>
          Qampus &copy; 2020 All Rights Reserved
	</span>

	<span className="login__footerSeparator"></span>
	<span>Developed by Nuclear Software (Pty) Ltd</span>
      </footer>
    </div>
  );
}

export default Login;
