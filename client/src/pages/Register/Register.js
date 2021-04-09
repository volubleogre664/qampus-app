import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import logo from "../../logo.png";
import { useForm } from "../../utils/hooks";
import { REGISTER_USER } from "../../utils/graphql";
import { useUserHelpers } from "../../Redux/getSlices";

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

  const [register] = useMutation(REGISTER_USER, {
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
      <section className="page_headers">
        <img  className="logo" src={logo} alt="qampus app register user" />
        <h1 className="welcome_header">Welcome</h1>
        <hr className="separator" />
      </section>

      <section className="page_content">
        <aside className="register__aside">
          <h1>Connect with other students</h1>
          <h1>Have others come to you to buy books</h1>
          <h1>Easily buy books from other students</h1>
          <h1>Find your way around your campus</h1>
          <h1>
            Create Your Account Now{" "}
            <span role="img" aria-label="right pointing finger">
              👉
            </span>{" "}
          </h1>
          <p>
            Already have an account? <Link to="login">Login</Link>
          </p>
        </aside>
        <main className="register__main">
        <h4 className="subtitle">Sign up for more features</h4>

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

          <Button type="submit">Register</Button>

          {/* Below button for testing */}
          {/* <Button onClick={onSubmit}>Register</Button>  */}
        </form>
      </main>
      </section>
    </div>
  );
}

export default Register;
