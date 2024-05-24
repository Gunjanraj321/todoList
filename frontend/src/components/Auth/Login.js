import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setToken } from "../Redux/AuthSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/sign/login",
        formData
      );
      const token = response.data.token;

      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("User not found or Please check your Password."); 
      } else {
        alert("An error occurred. Please try again later."); 
      }
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="p-8 shadow-lg rounded-xl text-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline text-cyan-600 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h1 class="text-3xl py-3 font-bold text-cyan-500">Log In</h1>
          <form className="text-left pt-3 " onSubmit={handleSubmit}>
            <input
              className="p-1 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="block p-1 mt-3 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className="bg-cyan-200 p-2 pr-5 pl-5 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 m-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
