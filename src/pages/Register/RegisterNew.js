import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "@utils/hooks";
import logo from "./logo1.png";
import "./RegisterNew.css";

function Register() {
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(null, {
    studentNumber: "",
    password: "",
  });

  const logoClicked = (e) => {
    e.preventDefault();
    history.push("/");
  };

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
              Create <span>Qampus</span> Account
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
