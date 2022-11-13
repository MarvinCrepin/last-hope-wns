import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import store from "./store";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].message === "Token expired") {
      localStorage.removeItem("KeyLastHope");
      window.location.href = "/login";
    }
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("KeyLastHope");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
