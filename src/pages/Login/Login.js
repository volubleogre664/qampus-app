import React from "react";
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

  return (
    <div className="login">
      <header className="login__header">
        <img className="login__headerLogo" src={logo} alt="qampus logo" />
      </header>
      <div className="welcome__text">
        <p>Welcome to Qampus</p>
      </div>
      <main className="login__main">
        <h3 className="title">Login to access full features</h3>

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
            <p>or</p>
            <Link className="form__signupLink" to="/register">
              Sign Up
            </Link>
          </div>
        </form>
      </main>

      <footer className="login__footer">
        <span>Qampus &copy; 2020 All Rights Reserved</span>

        <span className="login__footerSeparator"></span>
        <span>Developed by Nuclear Software (Pty) Ltd.</span>
      </footer>
    </div>
  );
}

export default Login;
