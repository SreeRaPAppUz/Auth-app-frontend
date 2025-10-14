import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";
import { toast } from "react-toastify";

export default function Register({ notifyRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner
    try {
      await registerUser(formData);
      notifyRegister();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden md:flex w-1/2 bg-gray-900 justify-center items-center">
        <div className="text-center px-10">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome! 🎉</h1>
          <p className="text-white text-lg">
            Join our AuthApp and start your journey. Register now to enjoy all
            the features!
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex justify-center items-center bg-indigo-50">
        <div className="w-full max-w-2xl p-10 rounded-3xl shadow-2xl border border-gray-400 bg-white">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Create Account ✨
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two-column fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full bg-indigo-50 text-gray-800 px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-indigo-50 text-gray-800 px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  className="w-full bg-indigo-50 text-gray-800 px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full bg-indigo-50 text-gray-800 px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Choose Role
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                    className="text-indigo-500 focus:ring-indigo-400"
                  />
                  Customer
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === "seller"}
                    onChange={handleChange}
                    className="text-indigo-500 focus:ring-indigo-400"
                  />
                  Seller
                </label>
              </div>
            </div>

            {/* Submit Button with Spinner */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition duration-300"
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
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-gray-700 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
