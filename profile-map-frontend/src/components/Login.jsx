import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-purple-200">
        <h2 className="text-3xl font-bold text-center text-purple-600">
          Login
        </h2>

        {/* Error Message */}
        {error && (
          <p className="mt-3 text-red-600 text-sm text-center bg-red-200 p-2 rounded-md">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-purple-600 font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-purple-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-purple-600 font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-purple-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-purple-600 font-medium hover:underline">
            Create new
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
