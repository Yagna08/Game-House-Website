import React, { useState } from "react";
import gameIcon from "../Images/Playing Casual Game.gif";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://game-house-website-backend.vercel.app/api/user/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.userid);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("button", true);
        message.success("Success");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // console.error(error);
      message.error("Something went wrong");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 w-full sm:max-w-md lg:py-0">
        <a className="flex items-center mb-2 text-2xl font-semibold text-gray-900">
          <img className="w-11 h-11 mr-2" src={gameIcon} alt="logo" />
          Game House
        </a>
        <div className="w-full bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={onFinish}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
