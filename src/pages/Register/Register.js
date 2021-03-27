import React from "react";
import { useMutation } from "@apollo/react-hooks";

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

  const [{ path }, dispatch] = useUserHelpers();

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      dispatch({
        type: "SET_USER",
        payload: userData,
      });

      (path && history.push(path)) || history.goBack();
    },
    variables: values,
    onError(err) {
      // setErrors(err.graphQLErrors[0].extensions.errors);
      console.log(err);
    },
  });

  function registerUser() {
    register();
  }

  return (
    <div className="register">
      <aside className="register__aside">
        <img src={logo} alt="qampus app register user" />
      </aside>

      <main className="register__main">
        <h1 className="title">Welcome to Qampus</h1>
        <h4 className="subtitle">Sign up for greater experince</h4>

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

          <button type="submit">Register</button>
        </form>
      </main>
    </div>
  );
}

export default Register;
