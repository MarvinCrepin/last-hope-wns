import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ButtonForm from "../../components/Login/ButtonForm";
import Logo from "../../assets/img/logo_LastHope.png";

import LoginQuery from "../../queries/auth/Login";
import { AUTHENTICATE_USER_IN_STORE } from "../../slicer/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [connectionInformation, setConnectionInformation] = useState({
    mail: "",
    password: "",
  });
  const [errorDisplay, setError] = useState({
    type: "",
    display: false,
    message: "",
  });

  const [loginQuery, { error, data }] = useLazyQuery(LoginQuery);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginQuery({
      variables: {
        mail: connectionInformation.mail,
        password: connectionInformation.password,
      },
    });
  };

  useEffect(() => {
    if (error) {
      let type = "";
      switch (error.message) {
        case "Invalid mail":
          type = "mail";
          break;
        case "Invalid password":
          type = "password";
          break;
        default:
          break;
      }
      setError({ message: error.message, display: true, type: type });
    }

    if (data) {
      dispatch(
        AUTHENTICATE_USER_IN_STORE({
          user: data.Login.user,
          token: data.Login.token,
        })
      );
      localStorage.setItem("KeyLastHope", data.Login.token);
      navigate("/dashboard");
    }
  }, [data, error]);

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
                onChange={(e) =>
                  setConnectionInformation({
                    ...connectionInformation,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
                id="mail"
                type="mail"
                name="mail"
                placeholder="user@gmail.com"
              />
              {errorDisplay.display && errorDisplay.type === "mail" && (
                <div className="absolute -top-5 text-lh-secondary text-sm">
                  Aucun utilisateur enregistré avec cette adresse
                </div>
              )}
            </div>
            <div className=" relative">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
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
              {errorDisplay.display && errorDisplay.type === "password" && (
                <div className="absolute -top-5 text-lh-secondary text-sm">
                  Mot de passe incorrect
                </div>
              )}
            </div>
            <div className="mb-5 text-xs ml-1 text-lh-primary cursor-pointer">
              Forgot your password? Reset it here
            </div>

            <ButtonForm text="Log In" type="submit" customClass="w-32" />
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
