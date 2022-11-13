import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ButtonForm from "../../components/Login/ButtonForm";
import Logo from "../../assets/img/logo_LastHope.png";

import LoginQuery from "../../graphql/mutation/auth/Login";
import { AUTHENTICATE_USER_IN_STORE } from "../../slicer/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [connectionInformation, setConnectionInformation] = useState({
    mail: "",
    password: "",
  });

  const [errorDisplay, setError] = useState({
    display: false,
    message: "",
  });

  const [loginMutation] = useMutation(LoginQuery, {
    variables: {
      loginUserInput: connectionInformation,
    },
    onCompleted(data) {
      dispatch(
        AUTHENTICATE_USER_IN_STORE({
          user: data.Login.user,
          token: data.Login.token,
        })
      );
      localStorage.setItem("KeyLastHope", data.Login.token);
      navigate("/dashboard");
    },
    onError(error) {
      setError({ message: error.message, display: true });
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginMutation();
  };

  return (
    <>
      <div className="flex min-h-screen justify-center items-center flex-col">
        <img src={Logo} alt="banner" className="pb-10" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-title text-lh-dark text-5xl">Log In</h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col justify-center items-center"
          >
            <div className="my-8 relative ">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                required
                onChange={(e) =>
                  setConnectionInformation({
                    ...connectionInformation,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                id="mail"
                type="email"
                name="mail"
                placeholder="user@gmail.com"
              />
              {errorDisplay.display && (
                <div className="absolute -top-5 text-lh-secondary text-sm">
                  {errorDisplay.message}
                </div>
              )}
            </div>
            <div className=" relative">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                required
                onChange={(e) =>
                  setConnectionInformation({
                    ...connectionInformation,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full sm:w-96  appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <div className="mb-5 text-xs ml-1 text-lh-primary cursor-pointer ">
              Forgot your password? Reset it here
            </div>

            <ButtonForm
              text="Log In"
              textFont="title"
              type="submit"
              width="w-32"
            />
          </form>
          <div
            onClick={() => navigate("/login/register")}
            className=" mt-4 text-xs ml-1 text-lh-primary cursor-pointer"
          >
            Don't have an account? Sign up
          </div>
        </div>
      </div>
    </>
  );
}
