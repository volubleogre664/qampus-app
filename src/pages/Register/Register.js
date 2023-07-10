import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "@utils/graphql";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices";
import { useForm, useUserInfo } from "@utils/hooks";
import logo from "@assets/Qampus_logo_grey.png";
import Input from "@components/Input";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [, dispatch] = useUserSlice();
  const [, dispatchUtils] = useUtilsSlice();
  const [terms, setTerms] = useState(false);
  const userInfo = useUserInfo();

  const { onChange, onSubmit, values, updateValues } = useForm(registerUser, {
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    university: "",
    picture: "",
    degree: "",
    campus: "",
    gender: "",
  });

  const logoClicked = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const [register] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      dispatch({
        type: "SET_USER",
        payload: { ...userData },
      });

      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Welcome to Qampus",
          subtitle:
            "Your account was successfully created. You can change your deatils by clicking the button on your top right.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });

      history.push("/");
    },
    variables: values,
    onError(err) {
      console.log(err);
      // if (
      //   Object.keys(err?.graphQLErrors[0]?.extensions?.errors).includes("email")
      // ) {
      //   // setWrongEmail("Invalid email, please try again.");
      // }

      // if (err?.graphQLErrors[0]?.extensions?.errors === "email_exists") {
      // }
    },
  });

  function registerUser(data) {
    register({
      vaariables: {
        ...values,
        gender: data.gender,
      },
    });
  }

  document.title = "Create Account - Qampus";

  useEffect(() => {
    if (values.email === userInfo?.email) {
      return;
    }

    if (userInfo) {
      updateValues({
        ...values,
        ...userInfo,
      });
    }
  }, [userInfo, updateValues, values]);

  return (
    <section className="register">
      <header className="register__header">
        <Link to="/" className="register__logo" onClick={logoClicked}>
          <img src={logo} alt="Qampus logo" className="register__logo__img" />
        </Link>
      </header>

      <main className="register__main">
        <h1 className="register__title">Account details</h1>

        <form className="register__form" onSubmit={onSubmit}>
          <header className="register__formHeader">
            <div className="main__info">
              <Input
                type="text"
                name="firstName"
                label="First Name"
                id="firstName"
                value={values.firstName}
                onChange={onChange}
                required
              />

              <Input
                type="text"
                name="lastName"
                label="Last Name"
                id="lastName"
                value={values.lastName}
                onChange={onChange}
                required
              />

              <Input
                type="email"
                name="email"
                id="email"
                label="Email"
                value={values.email}
                onChange={onChange}
                required
              />

              <Input
                type="text"
                name="university"
                id="university"
                label="University"
                value={values.university}
                onChange={onChange}
                
              />

              <Input
                type="text"
                name="degree"
                id="degree"
                label="Field of Study"
                value={values.degree}
                onChange={onChange}
              />

              <Input
                type="text"
                name="campus"
                id="campus"
                label="University Campus"
                value={values.campus}
                onChange={onChange}
              />
            </div>
          </header>

          <main className="register__formMain">
            <fieldset>
              <legend>Gender</legend>
              <div>
                <div>
                  <input
                    type="radio"
                    id="gender__male"
                    name="gender"
                    onChange={onChange}
                    value="Male"
                  />
                  <label htmlFor="gender__male">Male</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="gender__female"
                    onChange={onChange}
                    name="gender"
                    value="Female"

                  />
                  <label htmlFor="gender__female">Female</label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="gender"
                    onChange={onChange}
                    id="gender__none"
                    value="Rather not say"
                  />
                  <label htmlFor="gender__none">Rather not say</label>
                </div>
              </div>
            </fieldset>

            <div className="register__form__terms">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                value={terms}
                onChange={(e) => setTerms(e.target.checked)}
                required
              />

              <label htmlFor="terms" className="register__form__terms__label">
                I agree to the{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://nuclearsoftware.co.za/terms.html"
                  className="register__form__link"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://nuclearsoftware.co.za/terms.html"
                  className="register__form__link"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <div className="register__formMain__footer">
              <button className="register__form__button" type="submit">
                Create Account
              </button>
              {/* <p className="register__form__text">
                Already have an account?{" "}
                <Link to="/login" className="register__form__link">
                  Sign in
                </Link>
              </p> */}
            </div>
          </main>
        </form>
      </main>

      <footer className="register__footer">
        <p className="register__form__text">
          By creating an account, you agree to our{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://nuclearsoftware.co.za/terms.html"
            className="register__form__link"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://nuclearsoftware.co.za/terms.html"
            className="register__form__link"
          >
            Privacy Policy
          </a>
          . We use cookies to improve your experience on our site and to show you
          relevant advertising. To find out more, read our{" "}
          <Link to="/help" className="register__form__link">
            updated privacy policy
          </Link>
          .          
        </p>
      </footer>
    </section>
  );
}

export default Register;
