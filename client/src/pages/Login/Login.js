import { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { useUserHelpers } from "../../Redux/getSlices";
import { useForm } from "../../utils/hooks";
import { LOGIN_USER } from "../../utils/graphql";

import logo from "../../logo.png";
import Loader from "../../components/Loader/Loader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import "./Login.css";

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [, userDispatch] = useUserHelpers();
  const { onChange, onSubmit, values } = useForm(loginUser, {
    studentNumber: "",
    password: "",
  });
  // console.log(history);

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      userDispatch({ type: "SET_USER", payload: userData });
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    },
    variables: values,
    onError(err) {
      console.log(err?.graphQLErrors);
      // userDispatch({
      //   type: "SET_ERRORS",
      //   payload: err?.graphQLErrors[0]?.extensions?.errors,
      // });
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
      {loading && <Loader message={"Loggin in"} />}
      <header className="login__header">
        <img className="login__headerLogo" src={logo} alt="qampus logo" />
      </header>
      <div className="welcome__text">
        <p>Welcome</p>
        <hr className="separator" />
      </div>
      <main className="login__main">
        <h1 className="title">login to access all the features</h1>

        <form className="form" onSubmit={onSubmit}>
          <Input
            type="text"
            name="studentNumber"
            required
            maxLength="10"
            value={values.studentNumber}
            onChange={onChange}
            label="Student Number"
            id="studentNum"
          />

          <Input
            type="password"
            name="password"
            id="password"
            required
            value={values.password}
            label="Password"
            onChange={onChange}
          />

          <div className="form__btns">
            <Button type="submit" text="Login" />

            <div className="links">
              <Link className="form__signupLink" to="/register">
                Sign up
              </Link>
              <p>or</p>
              <Link className="form__guestLink" to="/">
                continue as a guest
                {/* When the user chooses this option, a function 
                should prevent them from accessing the full featuers*/}
              </Link>
            </div>
          </div>
        </form>
      </main>

      <footer className="login__footer">
        <hr className="separator_footer" />
        <span name="top_footer">Qampus &copy; 2020 | All Rights Reserved.</span>

        <span className="login__footerSeparator"></span>
        <span name="bottom_footer">
          Developed by Nuclear Software (Pty) Ltd
        </span>
      </footer>
    </div>
  );
}

export default Login;
