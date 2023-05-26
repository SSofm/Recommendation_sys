import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const url = "http://localhost:5000/users/";
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
  });
  const { username, age, email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}register`, user);
      navigate("/users/login");
    } catch (error) {
      alert("Sorry, that username already exits!");
    }
  };
  return (
    <div>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Sign Up
      </h1>
      <form
        className="bg-zinc-50 w-full max-w-sm ml-auto mr-auto"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="md:flex md:items-center mb-6 pt-2 mr-1">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-username"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-username"
              name="username"
              required
              value={username}
              type="text"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-1">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-age"
            >
              Age
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-age"
              name="age"
              type="text"
              required
              value={age}
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-1">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              name="email"
              required
              value={email}
              type="text"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-1">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              name="password"
              required
              placeholder="******************"
              type="password"
              value={password}
              autoComplete="true"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="content-center pb-4">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="flex ml-28">
          <div className="font-normal text-base text-blue-600">
            Already a member?
          </div>
          <div className="ml-2 font-medium">
            <Link to={"/users/login"}>Log In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
