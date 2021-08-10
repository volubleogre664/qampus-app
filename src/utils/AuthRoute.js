import { useUserHelpers } from "../Redux/getSlices";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
  const [{ user }] = useUserHelpers();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
