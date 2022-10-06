import React from "react";
import Login from "./src/screens/Login/Login";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { useEffect, useState } from "react";
import { setContext } from "@apollo/client/link/context";
import LoadedFont from "./src/utils/LoadedFont";
import Navigation from "./src/components/Navigation";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
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
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  console.log(store.getState().token);
  useEffect(() => {
    store.getState().token !== null ? setIsLogged(true) : setIsLogged(false);
    async function prepare() {
      try {
        await LoadedFont();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [store.getState().token]);
  if (!appIsReady) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {isLogged ? <Navigation appIsReady={appIsReady} /> : <Login />}
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
