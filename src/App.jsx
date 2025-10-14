import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import { getProfile } from "./api";
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user); // Persist user on refresh
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const notifyLogin = () => toast.success("Login successful!");
  const notifyRegister = () => toast.success("Registration successful!");
  const notifyLogout = () => toast.info("Logged out successfully!");

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Navbar user={user} setUser={setUser} notifyLogout={notifyLogout} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} notifyLogin={notifyLogin} />}/>
        <Route path="/login" element={<Login setUser={setUser} notifyLogin={notifyLogin} />} />
        <Route path="/register" element={<Register notifyRegister={notifyRegister} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/users" element={user?.role === "admin" ? <Users /> : <Navigate to="/dashboard" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
