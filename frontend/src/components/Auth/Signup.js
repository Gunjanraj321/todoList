import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setToken } from "../Redux/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/sign/signup",
        formData
      );

      const token = response.data.token;

      dispatch(setAuthenticated(true));
      dispatch(setToken(token));

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("An error occurred. Please try again later.");

      console.error(
        "Error occurred during signup:",
        typeof error === "function" ? error.toString() : error
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="p-8 shadow-lg rounded-xl text-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline text-cyan-600 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-cyan-500 pb-3">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                className="p-2 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                placeholder="Emelia Erickson"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="p-2 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                placeholder="emelia_erickson24@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="p-2 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Link to="/Login" className="text-sm text-cyan-600 underline mt-4 block">
              Already Have Account : Login
            </Link>
            <button
              type="submit"
              className="bg-cyan-200 p-2 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 mt-4"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
