import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Loader from "@components/Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices.js";
import { useForm } from "@utils/hooks.js";
import { LOGIN_USER, FORGOT_PASSWORD } from "@utils/graphql.js";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "@assets/Qampus_logo_grey.png";
import "./Login.css";
import useGQL from "../../utils/graphqlHooks";

function Login() {
  const history = useHistory();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [, userDispatch] = useUserSlice();
  const [error, setError] = useState(false);
  const [, dispatchUtils] = useUtilsSlice();
  const [forgotPassword, setForgotPassword] = useState(false);
  const { onChange, onSubmit, values } = useForm(loginUser, {
    email: "",
    password: "",
  });

  const [getUserData] = useGQL({
    type: "mutation",
    query: LOGIN_USER,
    onSuccess: (_, { data: { login: userData } }) => {
      setError(false);
      setLoading(false);
      // let jwt = jwtDecode(userData.token);
      // let isSecureAuth = jwt.permissions.includes("auth:secure_password");
      let isSecureAuth = false;

      userDispatch({
        type: "SET_USER",
        payload: { ...userData, edit: isSecureAuth, secure: isSecureAuth },
      });
      // const { from } = location.state || { from: { pathname: "/" } };

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

      history.push("/");
    },
    onError: (err) => {
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

  const loginClicked = () => {
    // localStorage.setItem("auth", "yes");
  };

  function loginUser() {
    setLoading(true);
    // login();
  }

  useEffect(() => {
    document.title = "Log In - Qampus";

    if (isAuthenticated) localStorage.setItem("auth", "yes");

    let auth = localStorage.getItem("auth");

    if (auth && auth === "yes") {
      getUserData({ variables: { email: user?.email, password: "sdsds" } });
    } else {
      loginWithRedirect({ redirectUri: window.location.href });
    }
  }, [getUserData, isAuthenticated, user, loginWithRedirect]);

  const logoClicked = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <section className="login">
      {loading && <Loader />}
      {/* {forgotPassword && <div className="login__overlay" />}
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

            <h2 className="login__title">welcome back</h2>

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
                <button
                  onClick={loginClicked}
                  className="login__mainFormButton"
                  type="submit"
                >
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
      </main> */}
    </section>
  );
}

export default Login;
