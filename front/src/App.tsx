import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import VerifyToken from "./graphql/queries/auth/VerifyToken";
import LoginRouter from "./Pages/Login/LoginRouter";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AUTHENTICATE_USER_IN_STORE } from "./slicer/authSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenInLocalStorage = localStorage.getItem("KeyLastHope");

  const [verifyToken] = useLazyQuery(VerifyToken, {
    onError: (err) => {
      if (err.message === "Token not valid") {
        console.log(err);
        localStorage.removeItem("KeyLastHope");
        navigate("/login");
      }
    },
    onCompleted(data) {
      if (data.SessionUser.user) {
        dispatch(
          AUTHENTICATE_USER_IN_STORE({
            user: data.SessionUser.user,
            token: tokenInLocalStorage,
          })
        );
        navigate("/dashboard");
      }
    },
  });

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <Routes>
      <Route path="/login/*" element={<LoginRouter />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
