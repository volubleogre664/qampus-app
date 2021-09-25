import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
// import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import Input from "../../components/Input/Input";
import Bullet from "../../components/Bullet/Bullet";

import { useForm } from "../../utils/hooks";
import { REGISTER_USER } from "../../utils/graphql";
import { useUserSlice } from "../../Redux/getSlices";
import { register as registerBullets } from "../../text_files/bulletPoints.js";

import logo from "../../logo.png";
import Button from "../../components/Button/Button";

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
  const [, dispatch] = useUserSlice();
  const [isEmail, setIsEmail] = useState(false);
  const [testCases] = useState({
    hasUppercase: new RegExp(/[A-Z]/),
    hasLowercase: new RegExp(/[a-z]/),
    hasNumbers: new RegExp(/[0-9]/),
  });

  const onSubmitCheck = (event) => {
    if (
      testCases.hasUppercase.test(values.password) &&
      testCases.hasLowercase.test(values.password) &&
      testCases.hasNumbers.test(values.password) &&
      isEmail
    ) {
      onSubmit(event);
    }
  };

  const onEmailChange = (e) => {
    const emailRegex = new RegExp(
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    );
    setIsEmail(emailRegex.test(e.target.value));
    onChange(e);
  };

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

      console.log(err);
    },
  });

  function registerUser() {
    register();
  }

  useEffect(() => {
    document.title = "Register Account - Qampus";
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
            {registerBullets.map((item, i) => (
              <Bullet
                key={`${item.title}_${i}`}
                index={i + 1}
                title={item.title}
                content={item.content}
              />
            ))}
          </ul>
        </div>

        <div className="register__main">
          <form onSubmit={onSubmitCheck} className="register__mainForm">
            <Input
              type="text"
              name="firstName"
              required
              value={values.firstName}
              onChange={onChange}
              label="First Name(s)"
              id="firstName"
              onInput={(e) => e.target.setCustomValidity("")}
              onInvalid={(e) =>
                e.target.setCustomValidity("Your firstname cannot be empty")
              }
            />

            <Input
              type="text"
              name="lastName"
              required
              value={values.lastName}
              onChange={onChange}
              label="Last Name"
              id="lastName"
              onInput={(e) => e.target.setCustomValidity("")}
              onInvalid={(e) =>
                e.target.setCustomValidity("Your lastname cannot be empty")
              }
            />

            <Input
              name="email"
              type="email"
              value={values.email}
              onChange={onEmailChange}
              label="Email Address"
              id="email"
              isvalid={String(isEmail)}
            />

            <Input
              type="text"
              name="studentNumber"
              required
              maxLength="10"
              minLength="10"
              value={values.studentNumber}
              onChange={onChange}
              label="Student Number"
              id="studentNumber"
              onInput={(e) => e.target.setCustomValidity("")}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Student number must be 10 characters(0-9)"
                )
              }
            />

            <Input
              type="password"
              name="password"
              required
              minLength="8"
              value={values.password}
              onChange={onChange}
              testCases={{
                hasUppercase: testCases.hasUppercase.test(values.password),
                hasLowercase: testCases.hasLowercase.test(values.password),
                hasNumber: testCases.hasNumbers.test(values.password),
              }}
              label="Password"
              id="password"
            />

            <Input
              type="password"
              name="confirmPassword"
              required
              value={values.confirmPassword}
              onChange={onChange}
              label="Confirm password"
              id="confirmPassword"
              isvalid={(values.confirmPassword === values.password).toString()}
            />

            <div className="checkbox_div">
              <input id="checkbox" type="checkbox" />
              <label htmlFor="checkbox">
                {" "}
                I agree to these{" "}
                <a className="link" target="_blank" href="/help">
                  Terms and Conditions
                </a>
                .
              </label>
            </div>
            <Button type="submit" text="Sign up" />

            {/* Below button for testing */}
            {/* <Button onClick={onSubmit}>Register</Button>  */}
          </form>
        </div>
      </section>
      <footer className="register__footer">
        <hr className="separator_footer" />
        <p className="top_footer">Qampus &copy; 2020 | All Rights Reserved.</p>
        <p className="bottom_footer">
          {" "}
          Developed by Nuclear Software (Pty) Ltd.
        </p>
      </footer>
    </div>
  );
}

export default Register;
