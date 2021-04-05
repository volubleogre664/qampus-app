import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useUserHelpers } from "../../Redux/getSlices";
import { useForm } from "../../utils/hooks";
import logo from "../../logo.png";
import { LOGIN_USER } from "../../utils/graphql";
import "./Login.css";

function Login({ history }) {
  const [{ path }, dispatch] = useUserHelpers();
  const { onChange, onSubmit, values } = useForm(loginUser, {
    studentNumber: "",
    password: "",
  });
  // console.log(history);

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      dispatch({ type: "SET_USER", payload: userData });
      (path && history.push(path)) || history.goBack();
    },
    variables: values,
    onError(err) {
      console.log(err);
    },
  });

  function loginUser() {
    login();
  }

  useEffect(() => {
    document.title = "Qampus | Login to Account";
  }, []);

  return (
    <div className="login">
      <header className="login__header">
        <img className="login__headerLogo" src={logo} alt="qampus logo" />
      </header>
      <div className="welcome__text">
        <p>Welcome... here you can sell texbooks, or buy them from other students.</p>
        <hr className="separator"/>

      </div>
      <main className="login__main">
        <h3 className="title">Please login to access all the features.</h3>

        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="studentNum">
            Student Number: <br />
            <input
              type="text"
              name="studentNumber"
              className="form__idInput"
              required
              maxLength="10"
              value={values.studentNumber}
              onChange={onChange}
              id="studentNum"
            />
          </label>

          <label htmlFor="password">
            Password: <br />
            <input
              type="password"
              name="password"
              id="password"
              required
              value={values.password}
              onChange={onChange}
              className="form__passwordInput"
            />
          </label>
          
          <div className="form__btns">
            <Button type="submit" className="form__btnSubmit">
              Login
            </Button>
            
            <div className="links">
              <Link className="form__signupLink" to="/register">
                Sign Up
              </Link>
              <p>or</p>
              <Link className="form__guestLink" to="/register">
                Continue as Guest
              </Link>
            </div>
            
          </div>
        </form>
      </main>
     
      <footer className="login__footer">
      <hr className="separator_footer"/>
        <span name="top_footer">Qampus &copy; 2020 | All Rights Reserved.</span>

        <span className="login__footerSeparator"></span>
        <span name="bottom_footer">Developed by Nuclear Software (Pty) Ltd</span>
      </footer>
    </div>
  );
}

export default Login;
