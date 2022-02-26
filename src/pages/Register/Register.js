import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "@utils/graphql";
import { useUserSlice } from "@redux/getSlices";
import { useForm } from "@utils/hooks";
// import DoneIcon from "@mui/icons-material/Done";
import Loader from "@components/Loader";
import logo from "@assets/Qampus_logo_grey.png";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [pin, setPin] = useState(false);
  const [pwdMatch, setPwdMatch] = useState(null);
  const [, dispatch] = useUserSlice();
  // const [pwdValid, setPwdValid] = useState({
  //   hasLowercase: false,
  //   hasNumber: false,
  //   hasUppercase: false,
  // });

  const { onChange, onSubmit, values } = useForm(registerUser, {
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
        payload: { ...userData, newUser: true },
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
      console.log(err?.graphQLErrors[0]?.extensions?.errors);
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

              {/* <div className="formInput__tips">
                <h4 className="formInput__tipsTitle">
                  Password must be at least 8 characters long and contain the
                  following
                </h4>

                <div className="formInput__tipsContent">
                  <span>
                    <DoneIcon
                      className={(pwdValid.hasUppercase && "success") || "fail"}
                    />
                    <span>Uppercase Letters</span>
                  </span>
                  <span>
                    <DoneIcon
                      className={(pwdValid.hasLowercase && "success") || "fail"}
                    />
                    <span>Lowercase Letters</span>
                  </span>
                  <span>
                    <DoneIcon
                      className={(pwdValid.hasNumber && "success") || "fail"}
                    />
                    <span>Numbers</span>
                  </span>
                </div>
              </div>
              <span className="pointer"></span> */}
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

            <h2 className="register__title">Create an account</h2>

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
                <button
                  className="login__mainFormButton"
                  onClick={addPasswords}
                >
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
