import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-white dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 mx-auto w-full sm:w-[600px] h-auto px-4 py-6 flex flex-col gap-6 items-center justify-center rounded-md shadow-md">
        <h1
          className="text-[#d6482b] dark:text-[#f87171] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl"
        >
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full px-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[16px] text-stone-500 dark:text-stone-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[16px] text-stone-500 dark:text-stone-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
            />
          </div>
          <button
            className="bg-[#d6482b] dark:bg-[#f87171] font-semibold hover:bg-[#b8381e] dark:hover:bg-[#c45353] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
