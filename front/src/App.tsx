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

  const [verifyToken, { error, data }] = useLazyQuery(VerifyToken);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const checkAuthentication = () => {
    console.log("checkAuthentication");
    if (!tokenInLocalStorage) {
      navigate("/login");
    }

    if (error) {
      console.log(error);

      if (error.message === "Token not valid") {
        localStorage.removeItem("KeyLastHope");
      }

      navigate("/login");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Routes>
      <Route path="/login/*" element={<LoginRouter />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
