import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import store from "./store";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function apiLink(state: string | null) {
  switch (state) {
    case "development" || null:
      return "http://localhost:4000";
    case "production":
      return "https://darroze-1-04-22.wilders.dev/graphql";
    case "staging":
      return "https://staging.darroze-1-04-22.wilders.dev/graphql";
  }
}

const httpLink = createHttpLink({
  uri: "/graphql",
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
  link: authLink.concat(httpLink),
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
