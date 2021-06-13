import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import App from "./App";
import { JWT_TOKEN_KEY } from "./constants";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/graphql"
    : "https://backend-dot-purchase-history-316614.ue.r.appspot.com//graphql";

console.log(uri);

// Using memory for caching queries
// createHttpLink that returns an apollo link
const link = createHttpLink({
  uri: uri,
});

const authLink = setContext(() => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getItems: {
            merge: (old, incoming) => incoming,
          },
        },
      },
    },
  }),
  link: authLink.concat(link as any) as any,
});

// Shoot the client away in a provider

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
