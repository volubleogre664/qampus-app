import { useAuth0 } from "@auth0/auth0-react";
import { useUserSlice } from "@redux/getSlices.js";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth0();
  const [{ user }] = useUserSlice();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
