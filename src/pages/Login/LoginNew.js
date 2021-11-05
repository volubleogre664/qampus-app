import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Loader from "@components/Loader";
import { useUserSlice } from "@redux/getSlices.js";
import { useForm } from "@utils/hooks.js";
import { LOGIN_USER } from "@utils/graphql.js";
import logo from "./logo1.png";
import "./LoginNew.css";

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [, userDispatch] = useUserSlice();
  const { onChange, onSubmit, values } = useForm(loginUser, {
    studentNumber: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      setError(false);
      userDispatch({ type: "SET_USER", payload: userData });
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    },
    variables: values,
    onError(err) {
      console.log(err?.graphQLErrors);
      setError(true);
    },
  });

  function loginUser() {
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
      {loading && <Loader message="Logging in" />}
      <main className="login__main">
        <section>
          <div>
            <div role="link" onClick={logoClicked} className="logoContainer">
              <img src={logo} alt="qampus" />
              <h2>Qampus</h2>
            </div>

            <h2 className="login__title">
              Log In to <span>Qampus</span>
            </h2>

            <form
              autoComplete="off"
              onSubmit={onSubmit}
              className="login__mainForm"
            >
              <div>
                <label htmlFor="email">Student number</label>
                <input
                  className="login__mainFormInput"
                  name="studentNumber"
                  value={values.studentNumber}
                  onChange={onChange}
                  type="text"
                  id="studentNumber"
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
                  <Link href="/login">Forgot password?</Link>
                </p>
              </div>

              <div>
                {error && <p>Student number or password incorrect.</p>}
                <button className="login__mainFormButton" type="submit">
                  Log In
                </button>
              </div>

              <p>
                New to Qampus? <Link to="/register">Create account.</Link>
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
