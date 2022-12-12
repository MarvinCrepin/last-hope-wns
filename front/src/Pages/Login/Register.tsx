import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonForm from "../../components/Login/ButtonForm";
import Logo from "../../assets/img/logo_LastHope.png";
import { useMutation } from "@apollo/client";
import AddUser from "../../graphql/mutation/auth/Register";
import { notify } from "../../components/common/Utils";

export default function Register() {
  const navigate = useNavigate();

  const [registerInformation, setRegisterInformation] = useState({
    firstname: "",
    lastname: "",
    password: "",
    mail: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInformation({
      ...registerInformation,
      [e.target.name]: e.target.value,
    });
  };

  const [registerMutation] = useMutation(AddUser, {
    variables: {
      createUserInput: registerInformation,
    },
    onCompleted(data) {
      navigate("/login");
    },
    onError(error) {
      // setError({ message: error.message, display: true });
      console.error(error);
    },
  });

  const onSubmitRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("avant la boucle");

    console.log(registerInformation.password);
    console.log(confirmPassword);

    if(registerInformation.password === confirmPassword) {
      console.log("passé");
      registerMutation();
    } else {
      console.log("pas passé");
      notify("error", "both password should be the same");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <img src={Logo} alt="banner" className="pb-10" />

      <div className="flex flex-col justify-center items-center">
        <h1 className="font-title text-lh-dark text-5xl">Register</h1>
        <form onSubmit={(e) => {
          onSubmitRegister(e);
        }} className="flex flex-col justify-center items-center">
          <div className="my-4">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => onChange(e)}
              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="user@gmail.com"
              name="mail"
              required
            />
          </div>
          <div className="mb-4">
            <label className="sr-only" htmlFor="firstname">
              firstname
            </label>
            <input
              onChange={(e) => onChange(e)}
              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="firstname"
              placeholder="Jean"
              name="firstname"
              required
            />
          </div>
          <div className="mb-4">
            <label className="sr-only" htmlFor="lastname">
              lastname
            </label>
            <input
              onChange={(e) => onChange(e)}
              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="lastname"
              placeholder="Dupont"
              name="lastname"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => onChange(e)}
              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              name="password"
              required
            />
          </div>

          <div className="mb-8 relative">
            <label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              required
            />
          </div>

          <ButtonForm
            textFont="title"
            width="w-32"
            type="submit"
            text="Sign up"
          />
        </form>
        <div onClick={() => navigate("/login")} className=" mt-4 text-xs ml-1 text-lh-primary cursor-pointer">
          Already have an account? Log in
        </div>
      </div>
    </div>
  );
}
