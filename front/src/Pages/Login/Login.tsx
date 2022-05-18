import ButtonForm from "../../components/Login/ButtonForm";

export default function Login() {
  return (
    <div className=" flex justify-center items-center flex-col">
      <img src="https://via.placeholder.com/470x138" alt="banner" />
      <h1 className="font-title text-lh-primary text-7xl pt-16 pb-10">
        LastHope
      </h1>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-title text-lh-dark text-3xl">Log In</h2>
        <form className="flex flex-col justify-center items-center space-y-4">
          <label className="sr-only" htmlFor="email">
            Username
          </label>
          <input
            className="shadow appearance-none border border-lh-dark rounded-lg w-full py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="user@gmail.com"
          />
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-lh-dark rounded-lg w-full py-2 px-3 text-gray-700 font-text leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
          />
          <ButtonForm text="Log In" type="submit" />
        </form>
      </div>
    </div>
  );
}
