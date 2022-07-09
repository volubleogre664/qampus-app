import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "@utils/graphql";
import { useUserSlice } from "@redux/getSlices";
import { useForm } from "@utils/hooks";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "@components/Loader";
import logo from "@assets/Qampus_logo_grey.png";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [pin, setPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwdMatch, setPwdMatch] = useState(null);
  const [wrongEmail, setWrongEmail] = useState(
    "Invalid email, please try again"
  );
  const [, dispatch] = useUserSlice();

  const {
    onChange: onInputChange,
    onSubmit,
    values,
  } = useForm(registerUser, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validInput, setValidInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const onChange = (e) => {
    setValidInput({
      ...validInput,
      [e.target.name]: e.target.value === "" ? "empty" : null,
    });

    onInputChange(e);
  };

  const logoClicked = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const [register] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      dispatch({
        type: "SET_USER",
        payload: { ...userData, newUser: true },
      });
      setPin(false);
      history.push("/");
      setLoading(false);
    },
    variables: values,
    onError(err) {
      console.log(err?.graphQLErrors[0]?.extensions?.errors);
      setLoading(false);
      if (
        Object.keys(err?.graphQLErrors[0]?.extensions?.errors).includes("email")
      ) {
        setWrongEmail("Invalid email, please try again.");
        setValidInput({ ...validInput, email: "invalid" });
      }

      if (err?.graphQLErrors[0]?.extensions?.errors === "email_exists") {
        setWrongEmail("Email already registered, change it or sign in.");
        setValidInput({ ...validInput, email: "invalid" });
      }

      setPin(false);
    },
  });

  const finish = () => {
    if (values.password === values.confirmPassword) {
      onSubmit();
      return;
    }

    setPwdMatch(false);
  };

  const addPasswords = (e) => {
    e.preventDefault();
    console.log(Object.values(validInput).every((item) => item === null));
    setValidInput({
      ...validInput,
      email: values.email === "" ? "empty" : null,
      firstName: values.firstName === "" ? "empty" : null,
      lastName: values.lastName === "" ? "empty" : null,
    });
    if (!Object.values(validInput).every((item) => item === null)) return;

    setPin(true);
  };

  function registerUser() {
    setLoading(true);
    register();
  }

  useEffect(() => {
    document.title = "Create Account - Qampus";
  }, []);

  return (
    <section className="register">
      {loading && <Loader />}
      <aside
        style={{ display: pin ? "grid" : "none" }}
        className={`register__aside ${pin && "open"}`}
      >
        <h3>Create password</h3>
        <main className="register__asideMain">
          <form>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="login__mainFormInput passwordInput"
                name="password"
                value={values.password}
                onChange={onChange}
                type="password"
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
                type="password"
                id="confirmPassword"
              />
            </div>
          </form>

          <div className="closeBtn">
            <span
              role="button"
              onClick={() => setPin(false)}
              className="icon-container"
            >
              <CloseIcon />
            </span>
          </div>

          {pwdMatch === false && (
            <p style={{ color: "red", fontWeight: "400", marginTop: "4px" }}>
              Passwords must match
            </p>
          )}
        </main>
        <footer className="register__asideFooter">
          <button onClick={finish} className="login__mainFormButton">
            Continue
          </button>
        </footer>
      </aside>
      <div className="register__overlay"></div>

      <main className="register__main">
        <section>
          <div>
            <div role="link" onClick={logoClicked} className="logoContainer">
              <img src={logo} alt="qampus" />
              <h2>Qampus</h2>
            </div>

            <h2 className="register__title">Create a new account</h2>

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
                  required
                  aria-required
                  type="text"
                  id="firstName"
                />
                {validInput.firstName === "empty" && <RequiredInput />}
              </div>

              <div>
                <label htmlFor="lastName">Surname</label>
                <input
                  className="login__mainFormInput"
                  name="lastName"
                  required
                  aria-required
                  value={values.lastName}
                  onChange={onChange}
                  type="text"
                  id="lastName"
                />
                {validInput.lastName === "empty" && <RequiredInput />}
              </div>

              <div>
                <label htmlFor="lastName">Email</label>
                <input
                  className="login__mainFormInput"
                  name="email"
                  required
                  aria-required
                  value={values.email}
                  onChange={onChange}
                  type="email"
                  id="email"
                />

                {validInput.email === "empty" && <RequiredInput />}

                {validInput.email === "invalid" && (
                  <RequiredInput message={wrongEmail} />
                )}
              </div>

              <div>
                <button
                  className="login__mainFormButton"
                  onClick={addPasswords}
                >
                  Register Account
                </button>
              </div>

              <p>
                <Link to="/login"> Already have an account? Sign in.</Link>
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

export const RequiredInput = ({ message = "* Required input" }) => {
  return (
    <p
      style={{
        fontSize: ".8rem",
        fontWeight: "400",
        color: "red",
        textAlign: "start",
        width: "100%",
        marginTop: "0",
      }}
    >
      {message}
    </p>
  );
};

export default Register;
