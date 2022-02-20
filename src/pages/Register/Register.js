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

  const ref_link = "https://www.vecteezy.com/members/onyxprj_art";
  const ref_name = "Vecteezy: onyxprj_art";

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
      history.push("/");
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
    <aside style={{ display: "none" }} className="register__aside">
      <h3>Create password</h3>
      <main className="register__asideMain">
        <form>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="login__mainFormInput"
              name="password"
              value={values.password}
              onChange={onChange}
              type="text"
              id="passsword"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="login__mainFormInput"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
              type="text"
              id="confirmPassword"
            />
          </div>
        </form>
      </main>
      <footer className="register__asideFooter">
        <button>Continue</button>
      </footer>
    </aside>

    <main className="register__main">
      <section>
        <div>
          <div role="link" onClick={logoClicked} className="logoContainer">
            <img src={logo} alt="qampus" />
            <h2>Qampus</h2>
          </div>

          <h2 className="register__title">
            Create an account
          </h2>

          <form
            autoComplete="off"
            onSubmit={onSubmit}
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
                id="firstName"
              />
            </div>

            <div>
              <label htmlFor="lastName">Surname</label>
              <input
                className="login__mainFormInput"
                name="lastName"
                value={values.lastName}
                onChange={onChange}
                type="text"
                id="lastName"
              />
            </div>

            <div>
              <label htmlFor="lastName">Student number</label>
              <input
                className="login__mainFormInput"
                name="studentNummber"
                value={values.studentNumber}
                onChange={onChange}
                type="text"
                id="studentNumber"
              />
            </div>

            <div>
              <label htmlFor="lastName">Email</label>
              <input
                className="login__mainFormInput"
                name="email"
                value={values.email}
                onChange={onChange}
                type="email"
                id="email"
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
                <p className="top_footer">&copy; Qampus 2022</p>
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
