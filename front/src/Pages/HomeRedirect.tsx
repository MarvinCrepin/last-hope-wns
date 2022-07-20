import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import VerifyToken from "../queries/auth/VerifyToken";
import { AUTHENTICATE_USER_IN_STORE } from "../slicer/authSlice";

type Props = {};

const HomeRedirect = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenInLocalStorage = localStorage.getItem("KeyLastHope");

  const [verifyToken, { error, data }] = useLazyQuery(VerifyToken, {
    context: {
      headers: {
        authorization: tokenInLocalStorage ? tokenInLocalStorage : "",
      },
    },
  });

  useEffect(() => {
    // // si aucun token dans le localstorage on renvoie ver la page de login
    // if (!tokenInLocalStorage) {
    //   navigate("/login");
    // }
    // verifyToken();
    // if (error) {
    //   console.log(error);
    //   navigate("/login");
    // }
    // if (data) {
    //   if (data.SessionUser.user) {
    //     dispatch(
    //       AUTHENTICATE_USER_IN_STORE({
    //         user: data.SessionUser.user,
    //         token: tokenInLocalStorage,
    //       })
    //     );
    //     navigate("/dashboard");
    //   }
    // }
  }, [data, error, verifyToken, tokenInLocalStorage, navigate, dispatch]);

  return <div></div>;
};

export default HomeRedirect;
