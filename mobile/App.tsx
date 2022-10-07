import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SplashScreen from "expo-splash-screen";

import AppEntry from "./AppEntry";

SplashScreen.preventAutoHideAsync();

const authLink = setContext((_, { headers }) => {
  const token = store.getState().token;
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});
const httpLink = createHttpLink({
  uri: "http://192.168.1.122:4000/graphql",
}); 

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppEntry/>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
