import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
// import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

import { useForm } from "../../utils/hooks";
import { REGISTER_USER } from "../../utils/graphql";
import { useUserHelpers } from "../../Redux/getSlices";

import logo from "../../logo.png";

import "./Register.css";

function Register({ history }) {
  const { onChange, onSubmit, values } = useForm(registerUser, {
    studentNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [, dispatch] = useUserHelpers();

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      dispatch({
        type: "SET_USER",
        payload: userData,
      });

      history.push("/register/finalise");
    },
    variables: values,
    onError(err) {
      dispatch({
        type: "SET_ERRORS",
        payload: err?.graphQLErrors[0]?.extensions?.errors,
      });
    },
  });

  function registerUser() {
    register();
  }

  // This code is for testing

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   dispatch({
  //     type: "SET_ERRORS",
  //     payload: {
  //       name: "Name cannot be empty",
  //       surname: "surname cannot be empty",
  //       password: "Password cannot be empty",
  //       confirmPassword: "This should match with password",
  //     },
  //   });
  // };

  useEffect(() => {
    document.title = "Qampus | Register Account";
  }, []);

  return (
    <div className="register">
      {loading && <Loader message="Creating account" />}
      <section className="page_headers">
        <a href="/">
          <img className="logo" src={logo} alt="qampus app register user" />
        </a>
        <h1 className="welcome_header">Welcome</h1>
        <hr className="separator" />
        <h2 className="title">please register to access all the features</h2>
      </section>

      <section className="page_content">
        <div className="register__aside">
          <p className="list_tittle">Why should I create an account?</p>
          <ul className="tilesWrap">
            <li>
              <h2>01</h2>
              <h3>Advertise to the entire campus</h3>
              <p>
                You can upload your used texbooks and connect with thousands of
                students who are looking to buy them. When you register you can
                upload 2 textbooks for FREE.
              </p>
            </li>
            <li>
              <h2>02</h2>
              <h3>Spend less on textbooks</h3>
              <p>
                Save yourself thousands of rands in texbooks fees by buying used
                texbooks from students who are on your campus.{" "}
              </p>
            </li>
            <li>
              <h2>03</h2>
              <h3>Never get lost on campus</h3>
              <p>
                Do you have an unfamiliar class venue? Find your way around
                campus by using our navigation system.
              </p>
            </li>
            <li>
              <h2>04</h2>
              <h3>Meet more interesting people</h3>
              <p>
                Connect with your peers who are registered on Qampus and get to
                know them better.
              </p>
            </li>
          </ul>
        </div>

        <div className="register__main">
          <form onSubmit={onSubmit} className="register__mainForm">
            <label htmlFor="firstName">
              First Name(s): <br />
              <input
                type="text"
                name="firstName"
                className="formInput"
                required
                value={values.firstName}
                onChange={onChange}
                id="firstName"
              />
            </label>

            <label htmlFor="lastName">
              Last Name: <br />
              <input
                type="text"
                name="lastName"
                className="formInput"
                required
                value={values.lastName}
                onChange={onChange}
                id="lastName"
              />
            </label>

            <label htmlFor="email">
              Email Address: <br />
              <input
                type="email"
                name="email"
                className="formInput"
                required
                value={values.email}
                onChange={onChange}
                id="email"
              />
            </label>

            <label htmlFor="studentNumber">
              Student Number: <br />
              <input
                type="text"
                name="studentNumber"
                className="formInput"
                required
                maxLength="10"
                value={values.studentNumber}
                onChange={onChange}
                id="studentNumber"
              />
            </label>

            <label htmlFor="password">
              Password: <br />
              <input
                type="password"
                name="password"
                className="formInput"
                required
                value={values.password}
                onChange={onChange}
                id="password"
              />
            </label>

            <label htmlFor="confirmPassword">
              Confirm password: <br />
              <input
                type="password"
                name="confirmPassword"
                className="formInput"
                required
                value={values.confirmPassword}
                onChange={onChange}
                id="confirmPassword"
              />
            </label>

            <Button type="submit">Sign up</Button>

            {/* Below button for testing */}
            {/* <Button onClick={onSubmit}>Register</Button>  */}
          </form>
        </div>
      </section>
      <footer className="register__footer">
        <hr className="separator_footer" />
        <span name="top_footer">Qampus &copy; 2020 | All Rights Reserved.</span>

        <span className="register__footerSeparator"></span>
        <span name="bottom_footer">
          Developed by Nuclear Software (Pty) Ltd
        </span>
      </footer>
    </div>
  );
}

export default Register;
