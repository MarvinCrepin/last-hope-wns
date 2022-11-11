import ButtonForm from "../../components/Login/ButtonForm";
import Logo from "../../assets/img/logo_LastHope.png";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <img src={Logo} alt="banner" className="pb-10" />

      <div className="flex flex-col justify-center items-center">
        <h1 className="font-title text-lh-dark text-5xl">
          Reset your password
        </h1>
        <form className="flex flex-col justify-center items-center">
          <div className="my-4">
            <label className="sr-only" htmlFor="email">
              Username
            </label>
            <input
              className="w-full sm:w-96 appearance-none border border-lh-dark rounded-lg py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="user@gmail.com"
            />
          </div>
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between items-center w-full">
            <ButtonForm
              textFont="title"
              width="w-32"
              type="button"
              text="Home"
            />
            <ButtonForm
              text="Reset"
              textFont="title"
              width="w-32"
              type="button"
            />
          </div>
        </form>
        <div className=" mt-4 text-xs ml-1 text-lh-primary cursor-pointer">
          Don't have an account? Sign up
        </div>
      </div>
    </div>
  );
}
