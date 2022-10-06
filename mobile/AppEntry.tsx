import React from "react";
import Login from "./src/screens/Login/Login";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect, useState } from "react";
import LoadedFont from "./src/utils/LoadedFont";
import Navigation from "./src/components/Navigation";
import VerifyToken from "./src/graphql/queries/User/VerifyToken";

import * as SplashScreen from "expo-splash-screen";
import { LOGOUT_USER } from "./src/slicer/authReducer";

export default function AppEntry() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [verifyToken, { error, data }] = useLazyQuery(VerifyToken);
  const dispatch = useDispatch();
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const checkAuthentication = () => {
    if (error)
      if (error.message === "Token not valid") {
        dispatch(LOGOUT_USER());
      }
    console.log(JSON.stringify(error, null, 2));
  };

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  useEffect(() => {
    console.log("token", store.getState().token);

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

  return <>{isLogged ? <Navigation appIsReady={appIsReady} /> : <Login />}</>;
}
