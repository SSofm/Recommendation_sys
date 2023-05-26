import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/auth/login", user);

      if (resp.data.isAdmin) {
        navigate("/admin", {
          state: {
            userId: resp.data.id,
            email: email,
            cartId: resp.data.cartId,
            isAdmin: resp.data.isAdmin,
          },
        });
      } else {
        navigate("/home", {
          state: {
            userId: resp.data.id,
            email: email,
            cartId: resp.data.cartId,
          },
        });
      }
    } catch (error) {
      alert("Your email/password do not match. Please try again!");
    }
  };
  return (
    <div>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Login
      </h1>
      <div className="w-full max-w-xs ml-auto mr-auto mt-6">
        <form
          className="bg-zinc-50 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => onInputChange(e)}
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
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              autoComplete="on"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="flex ml-10 mt-3">
            <div className="font-normal text-base text-blue-600">
              Not a member?
            </div>
            <div className="ml-2 font-medium">
              <Link to={"/users/register"}>Signup</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
