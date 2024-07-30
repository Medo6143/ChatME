import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };


  return (
    <div
      className="w-full bg-blue-400  h-screen flex justify-center items-center flex-wrap "
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/colorful-3d-background_23-2148484152.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white bg-opacity-50 p-8 rounded shadow-md w-full max-w-md">
        <h1
          className="text-center text-2xl font-bold tracking-widest"
          style={{ letterSpacing: "0.1em", textShadow: "2px 2px 4px blue" }}
        >
          ChatME
        </h1>
        <h2 className="text-2xl font-bold mb-6 text-center ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline min-w-full"
              type="submit"
            >
              Login
            </button>
          </div>
          {err ? (
            <p className="text-red-500 text-sm italic">Something is wrong</p>
          ) : null}
        </form>
        <p className="text-gray-700 text-sm mt-4">
          Dont have an account?
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
