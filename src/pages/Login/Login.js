import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "@components/Loader";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices.js";
import { LOGIN_USER } from "@utils/graphql.js";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";
import useGQL from "../../utils/graphqlHooks";

function Login() {
  const history = useHistory();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [, userDispatch] = useUserSlice();
  const [, dispatchUtils] = useUtilsSlice();

  const [getUserData] = useGQL({
    type: "mutation",
    query: LOGIN_USER,
    onSuccess: (_, { data: { login: userData } }) => {
      setLoading(false);
      let isSecureAuth = false;

      userDispatch({
        type: "SET_USER",
        payload: { ...userData, edit: isSecureAuth, secure: isSecureAuth },
      });

      if (isSecureAuth) {
        dispatchUtils({
          type: "DELETE_BOOK",
          payload: {
            title: "Change password",
            subtitle:
              "You just logged in with a secure password, please make a new password on your profile",
            btnCancel: false,
            btnContinue: true,
            bookTitle: "",
            popupShow: true,
          },
        });

        userDispatch({
          type: "SET_SECURE_LOGIN",
          payload: { secure: true },
        });
      }

      history.push("/");
    },
    onError: (err) => {
      let returnedErr = err.graphQLErrors[0];

      console.log(returnedErr);

      if (returnedErr?.extensions?.error === "invalid_email") {
        setLoading(false);
        history.push("/register");
      } else {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    document.title = "Log In - Qampus";

    if (isAuthenticated) localStorage.setItem("auth", "yes");

    let auth = localStorage.getItem("auth");

    if (auth && auth === "yes") {
      getUserData({ variables: { email: user?.email, password: "sdsds" } });
    } else {
      loginWithRedirect({ redirectUri: window.location.href });
    }
  }, [getUserData, isAuthenticated, user, loginWithRedirect]);

  return <section className="login">{loading && <Loader />}</section>;
}

export default Login;
