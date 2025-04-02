import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-purple-100 p-4 flex justify-between items-center border-b-2 border-purple-400 shadow-md">
      <h1 className="text-2xl text-purple-700 font-bold">Profile Map</h1>
      <nav className="flex items-center space-x-4">
        <NavLink
          to="/admin"
          className="text-purple-600 font-semibold hover:text-purple-800 transition"
        >
          Add Profiles
        </NavLink>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-purple-500 text-white px-5 py-2 rounded font-semibold hover:bg-purple-600 transition"
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Headers;
