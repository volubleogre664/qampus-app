import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { Provider as ReduxProvider } from "react-redux";

import store from "./Redux/store";
import App from "./App";

const serverURL = "qampus-app.herokuapp.com/graphql";

// Rest of features eendpoint
const httpLink = createHttpLink({
  uri: `https://${serverURL}`,
  credentials: "include",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// WebSocket endpoint
// WebSockects send data in realtime. We use it for messages
// const wsLink = new WebSocketLink({
//   uri: `ws://${serverURL}/subscriptions`,
//   options: {
//     reconnect: true,
//   },
//   webSocketImpl: WebSocket,
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink)
// );

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
