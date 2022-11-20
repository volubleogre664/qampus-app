import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { Provider as ReduxProvider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import store from "./Redux/store";
import App from "./App";

const serverURL = "https://server.qampus.co.za/graphql";
// const serverURL = "http://127.0.0.1:8080/graphql";

// Rest of features endpoint
const httpLink = createHttpLink({
  uri: serverURL,
  // credentials: "include",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <Auth0Provider
        domain="dev-l5ikw83k0ienhwzt.us.auth0.com"
        clientId="AjZ05i3EWuN28UCEE59Sq7QP8nOV9b3Z"
        audience="https://server.qampus.co.za/api"
        scope="read:current_user update:current_user_metadata"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </ReduxProvider>
  </ApolloProvider>
);
