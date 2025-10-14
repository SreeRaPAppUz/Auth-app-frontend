import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

export default function Navbar({ user, setUser, notifyLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      notifyLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getAvatarLetter = (username) =>
    username ? username.charAt(0).toUpperCase() : "?";

  return (
    <nav className="w-full bg-gray-900 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-white font-extrabold text-3xl tracking-wide hover:text-yellow-300 transition duration-300"
          >
            Auth<span className="text-pink-400">App</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-white no-underline hover:text-yellow-300 transition duration-300"
                >
                  Home
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/users"
                    className="text-white no-underline hover:text-yellow-300 transition duration-300"
                  >
                    Users
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-white no-underline hover:text-yellow-300 transition font-medium"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md">
                    {getAvatarLetter(user.username)}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-semibold transition shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg font-semibold transition shadow-md no-underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 py-2 rounded-lg font-semibold transition shadow-md no-underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none p-2 rounded-md"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-gray-900 rounded-b-lg text-white px-4 py-4 shadow-lg">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="block text-white no-underline hover:text-yellow-300 font-medium"
                >
                  Home
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/users"
                    className="block text-white no-underline hover:text-yellow-300 font-medium"
                  >
                    Users
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block text-white no-underline hover:text-yellow-300 font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-semibold transition shadow-md mt-2"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  className="block border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg font-semibold shadow-md mt-2 no-underline"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="block border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 py-2 rounded-lg font-semibold shadow-md mt-2 no-underline"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
