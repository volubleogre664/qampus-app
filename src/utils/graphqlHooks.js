/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

const useGQL = ({
  type = "query",
  variables = {},
  query,
  onError,
  onSuccess,
}) => {
  const auth0 = useAuth0();

  let token = "";

  if (auth0.isAuthenticated) {
    token = auth0.getAccessTokenSilently();
  }

  // Set access token for auth0
  const context = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  switch (type) {
    case "mutation": {
      const [mutate] = useMutation(query, {
        variables,
        onError,
        update: onSuccess,
        context,
      });

      return [mutate];
    }

    case "lazyQuery": {
      const [getData] = useLazyQuery(query, {
        variables,
        onError,
        onCompleted: onSuccess,
        context,
      });

      return [getData];
    }

    default:
    case "query": {
      const [getData] = useQuery(query, {
        variables,
        onError,
        context,
        onCompleted: onSuccess,
      });

      return [getData];
    }
  }
};

export default useGQL;
