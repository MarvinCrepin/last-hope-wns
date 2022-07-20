import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginRouter from "./Pages/Login/LoginRouter";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import VerifyToken from "./queries/auth/VerifyToken";
import { useDispatch } from "react-redux";
import { AUTHENTICATE_USER_IN_STORE } from "./slicer/authSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenInLocalStorage = localStorage.getItem("KeyLastHope");

  const [verifyToken, { error, data }] = useLazyQuery(VerifyToken);

  const checkAuthentication = () => {
    if (!tokenInLocalStorage) {
      navigate("/login");
    }

    verifyToken();

    if (error) {
      console.log(error);
    }

    if (data) {
      if (data.SessionUser.user) {
        dispatch(
          AUTHENTICATE_USER_IN_STORE({
            user: data.SessionUser.user,
            token: tokenInLocalStorage,
          })
        );
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [error, data]);

  return (
    <Routes>
      <Route path="/login/*" element={<LoginRouter />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
