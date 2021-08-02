import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
// import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import Input from "../../components/Input/Input";

import { useForm } from "../../utils/hooks";
import { REGISTER_USER } from "../../utils/graphql";
import { useUserHelpers } from "../../Redux/getSlices";

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
            <Input
              type="text"
              name="firstName"
              required
              value={values.firstName}
              onChange={onChange}
              label="First Name(s)"
              id="firstName"
            />

            <Input
              type="text"
              name="lastName"
              required
              value={values.lastName}
              onChange={onChange}
              label="Last Name"
              id="lastName"
            />

            <Input
              type="email"
              name="email"
              required
              value={values.email}
              onChange={onChange}
              label="Email Address"
              id="email"
            />

            <Input
              type="text"
              name="studentNumber"
              required
              maxLength="10"
              value={values.studentNumber}
              onChange={onChange}
              label="Student Number"
              id="studentNumber"
            />

            <Input
              type="password"
              name="password"
              required
              value={values.password}
              onChange={onChange}
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
            />

            <Button type="submit" text="Sign up" />

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
