import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login/Login";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  createHttpLink,
} from "@apollo/client";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "./store";
import VerifyToken from "./src/graphql/queries/User/VerifyToken";
import { useEffect } from "react";
import { user } from "./src/slicer/authReducer";
import { persistStore } from "redux-persist";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});
const httpLink = createHttpLink({
  uri: "http://192.168.1.94:4000/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default function App() {

  useEffect(() => {
    persistStore(store, null, () => {
      console.log(store.getState().user);
    });
  }, [])
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Login />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
