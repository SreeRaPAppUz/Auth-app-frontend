import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const registerUser = (data) => axiosInstance.post("/auth/register", data);

// Login user
export const loginUser = (data) => axiosInstance.post("/auth/login", data);

// Logout user
export const logoutUser = () => axiosInstance.post("/auth/logout", {}, { withCredentials: true });

// Get logged-in user profile
export const getProfile = () => axiosInstance.get("/users/profile");

// Update logged-in user profile
export const updateProfile = (data) => axiosInstance.put("/users/profile", data);

// Get all users (admin only)
export const getAllUsers = () => axiosInstance.get("/users");

// Update user role (admin)
export const updateUserRole = (userId, newRole) => axiosInstance.patch(`/users/${userId}/role`, { role: newRole });