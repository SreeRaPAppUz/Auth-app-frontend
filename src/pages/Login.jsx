import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";
import { toast } from "react-toastify";

export default function Login({ setUser, notifyLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner
    try {
      const res = await loginUser(formData);
      setUser(res.data.user);
      notifyLogin();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden md:flex w-1/2 bg-gray-900 justify-center items-center">
        <div className="text-center px-10">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome Back! 👋</h1>
          <p className="text-white text-lg">
            Enter your credentials to access your account and continue your journey.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex justify-center items-center bg-indigo-50">
        <div className="w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-400 bg-white">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Login 🔐
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full bg-indigo-50 text-gray-800 px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full bg-indigo-50 text-gray-800 px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            {/* Submit Button with Spinner */}
            <button
              type="submit"
              className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition duration-300`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-700 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
