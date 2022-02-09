import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "@utils/graphql";
import { useUserSlice } from "@redux/getSlices";
import { useForm } from "@utils/hooks";
import Loader from "@components/Loader";
import logo from "@assets/logo_grey.png";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [pin, setPin] = useState(false);
  const [, dispatch] = useUserSlice();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    studentNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const logoClicked = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      dispatch({
        type: "SET_USER",
        payload: userData,
      });
      setPin(false);
    },
    variables: values,
    onError(err) {
      dispatch({
        type: "SET_ERRORS",
        payload: err?.graphQLErrors[0]?.extensions?.errors,
      });
      setPin(false);
      console.log(err);
    },
  });

  const setPassword = (e) => {
    e.preventDefault();
    setPin(true);
  };

  function registerUser() {
    register();
  }

  useEffect(() => {
    document.title = "Create Account - Qampus";
  }, []);

  return (
    <section className="register">
      {loading && <Loader message="Creating account" />}
      <aside className={`register__aside  ${pin && "open"}`}>
        <p>Your account will be ready soon, please create a strong password</p>
        {/* <h3>Create password</h3> */}
        <main className="register__asideMain">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="login__mainFormInput"
                name="password"
                required
                value={values.password}
                onChange={onChange}
                type="password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="login__mainFormInput"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                required
                type="password"
              />
            </div>
            <footer className="register__asideFooter">
              <button type="submit" className="login__mainFormButton">
                Continue
              </button>
            </footer>
          </form>
        </main>
      </aside>
      <div className="register__overlay"></div>

      <main className="register__main">
        <section>
          <div>
            <header>
              <div role="link" onClick={logoClicked} className="logoContainer">
                <img src={logo} alt="qampus" />
                <h2>Qampus</h2>
              </div>
            </header>

            <h2 className="register__title">
              Create <span>Qampus</span> Account
            </h2>

            <form
              autoComplete="off"
              onSubmit={setPassword}
              className="login__mainForm"
            >
              <div>
                <label htmlFor="firstName">Name</label>
                <input
                  className="login__mainFormInput"
                  name="firstName"
                  value={values.firstName}
                  onChange={onChange}
                  type="text"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName">Surname</label>
                <input
                  className="login__mainFormInput"
                  name="lastName"
                  value={values.lastName}
                  onChange={onChange}
                  required
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="lastName">Student number</label>
                <input
                  className="login__mainFormInput"
                  name="studentNumber"
                  value={values.studentNumber}
                  onChange={onChange}
                  required
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="lastName">Email</label>
                <input
                  className="login__mainFormInput"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  required
                  type="email"
                />
              </div>

              <div>
                {/* {error && <p>Student number or password incorrect.</p>} */}
                <button className="login__mainFormButton" type="submit">
                  Register
                </button>
              </div>

              <p>
                Already have an account? <Link to="/login">Log In.</Link>
              </p>

              <footer className="login__footer">
                <div>
                  <p className="top_footer">&copy; Qampus 2021</p>
                </div>

                <div>
                  <Link to="/help">Help</Link>
                  <Link to="/help">Terms</Link>
                </div>
              </footer>
            </form>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Register;
