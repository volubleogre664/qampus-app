import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { Provider as ReduxProvider } from "react-redux";

import store from "./Redux/store";
import App from "./App";

// const serverURL = "https://qampus-app.herokuapp.com/graphql";
const serverURL = "http://127.0.0.1:8080/graphql";

// Rest of features eendpoint
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
      <App />
    </ReduxProvider>
  </ApolloProvider>
);
