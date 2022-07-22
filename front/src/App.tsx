import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginRouter from "./Pages/Login/LoginRouter";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import VerifyToken from "./queries/auth/VerifyToken";
import { useDispatch } from "react-redux";
import { AUTHENTICATE_USER_IN_STORE } from "./slicer/authSlice";
import { User } from "./components/global";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);

  const tokenInLocalStorage = localStorage.getItem("KeyLastHope");

  const [verifyToken, { error, data }] = useLazyQuery(VerifyToken);

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
    verifyToken();
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [data, error]);

  return (
    <Routes>
      <Route path="/login/*" element={<LoginRouter />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
