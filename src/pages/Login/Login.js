import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Loader from "@components/Loader";
import jwtDecode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices.js";
import { useForm } from "@utils/hooks.js";
import { LOGIN_USER, FORGOT_PASSWORD } from "@utils/graphql.js";
import logo from "@assets/Qampus_logo_grey.png";
import "./Login.css";

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [, userDispatch] = useUserSlice();
  const [error, setError] = useState(false);
  const [, dispatchUtils] = useUtilsSlice();
  const [forgotPassword, setForgotPassword] = useState(false);
  const { onChange, onSubmit, values } = useForm(loginUser, {
    email: "",
    password: "",
  });

  let [login] = useMutation(LOGIN_USER, {
    variables: values,
    update(_, { data: { login: userData } }) {
      setError(false);
      setLoading(false);
      let jwt = jwtDecode(userData.token);
      let isSecureAuth = jwt.permissions.includes("auth:secure_password");

      userDispatch({
        type: "SET_USER",
        payload: { ...userData, edit: isSecureAuth, secure: isSecureAuth },
      });
      const { from } = location.state || { from: { pathname: "/" } };

      if (isSecureAuth) {
        dispatchUtils({
          type: "DELETE_BOOK",
          payload: {
            title: "Change password",
            subtitle:
              "You just logged in with a secure password, please make a new password on your profile",
            btnCancel: false,
            btnContinue: true,
            bookTitle: "",
            popupShow: true,
          },
        });

        userDispatch({
          type: "SET_SECURE_LOGIN",
          payload: { secure: true },
        });
      }

      history.replace(from);
    },
    onError(err) {
      setError(true);
      console.log(err);
      setLoading(false);
    },
  });

  const [sendForgotPasswordReq] = useMutation(FORGOT_PASSWORD, {
    variables: { email: values.email },
    update() {
      // Tell the user next steps to follow
      setLoading(false);
      setForgotPassword(false);
      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Check your email",
          subtitle:
            "We sent you an email with a one time use secure password. Use it to login then change your password in your profile to something you can remember.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
    },
    onError(err) {
      // TODO: I wonder what to do here mate
      // console.log("Yooo", err);
      setLoading(false);
    },
  });

  const forgotPasswordRequest = (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendForgotPasswordReq();
    setLoading(true);
  };

  const forgotPasswordClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setForgotPassword(true);
  };

  function loginUser() {
    setLoading(true);
    login();
  }

  useEffect(() => {
    document.title = "Log In - Qampus";
  }, []);

  const logoClicked = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <section className="login">
      {loading && <Loader />}
      {forgotPassword && <div className="login__overlay" />}
      {forgotPassword && (
        <div className="forgotPassword">
          <div className="close">
            <span
              role="button"
              onClick={() => setForgotPassword(false)}
              className="icon-container"
            >
              <CloseIcon />
            </span>
          </div>

          <h4>Forgot your password?</h4>
          <p>Enter your email and press continue</p>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            className="login__mainFormInput"
          />
          <button
            onClick={forgotPasswordRequest}
            className="login__mainFormButton"
          >
            Continue
          </button>
        </div>
      )}
      <main className="login__main">
        <section>
          <div>
            <div role="link" onClick={logoClicked} className="logoContainer">
              <img className="loginLogo" src={logo} alt="qampus" />
              <h2>Qampus</h2>
            </div>

            <h2 className="login__title">Welcome back...</h2>

            <form
              autoComplete="off"
              onSubmit={onSubmit}
              className="login__mainForm"
            >
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="login__mainFormInput"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  type="text"
                  id="email"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  onChange={onChange}
                  value={values.password}
                  className="login__mainFormInput"
                  name="password"
                  type="password"
                />
                <p>
                  <Link to="" role="button" onClick={forgotPasswordClicked}>
                    Forgotten password?
                  </Link>
                </p>
              </div>

              <div>
                {error && <p>Email or password is incorrect.</p>}
                <button className="login__mainFormButton" type="submit">
                  Sign in
                </button>
              </div>

              <p>
                New to Qampus? <Link to="/register">Create an account.</Link>
              </p>
            </form>

            <footer className="login__footer">
              <div>
                <p className="top_footer">&copy; Qampus 2021</p>
              </div>

              <div>
                <Link to="/help">Help</Link>
                <Link to="/help">Terms</Link>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Login;
