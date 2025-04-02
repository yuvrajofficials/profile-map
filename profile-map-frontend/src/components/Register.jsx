import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error message on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return setError("All fields are required!");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long!");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email: formData.email,
        password: formData.password,
      });

      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-purple-200">
        <h2 className="text-3xl font-bold text-center text-purple-600">
          Register
        </h2>

        {/* Error & Success Messages */}
        {error && (
          <p className="mt-3 text-red-600 text-sm text-center bg-red-200 p-2 rounded-md">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-3 text-green-600 text-sm text-center bg-green-200 p-2 rounded-md">
            {success}
          </p>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-purple-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-purple-50"
              required
            />
          </div>

          <div>
            <label className="text-purple-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-purple-50"
              required
            />
          </div>

          <div>
            <label className="text-purple-600 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-purple-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
