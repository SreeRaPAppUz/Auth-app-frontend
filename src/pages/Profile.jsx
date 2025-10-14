import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import { toast } from "react-toastify";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.user); 
        setFormData({ ...res.data.user, newPassword: "" }); 
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const updateData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
    };
    if (formData.newPassword) updateData.password = formData.newPassword;

    try {
      const res = await updateProfile(updateData);
      setProfile(res.data.user);
      setFormData({ ...res.data.user, newPassword: "" });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    } finally {
      setUpdating(false);
    }
  };

  const getAvatarLetter = (username) => username?.charAt(0).toUpperCase() || "?";

  if (loading)
    return <div className="text-center mt-10 text-gray-700">Loading profile...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Column - Avatar */}
        <div className="md:w-1/3 bg-indigo-600 text-white flex flex-col items-center justify-center p-6">
          <div className="w-32 h-32 rounded-full bg-white text-indigo-600 flex items-center justify-center text-5xl font-bold mb-4">
            {getAvatarLetter(profile.username)}
          </div>
          <h4 className="text-xl font-semibold">{profile.username}</h4>
          <p className="uppercase text-sm">{profile.role}</p>
          <p className="text-sm mt-1">{profile.email}</p>
        </div>

        {/* Right Column - Form */}
        <div className="md:w-2/3 p-6">
          <h3 className="text-2xl font-semibold mb-6">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Leave empty if not changing"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
