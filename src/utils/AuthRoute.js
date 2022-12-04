import { useAuth0 } from "@auth0/auth0-react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
