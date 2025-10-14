import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../api";
import { toast } from "react-toastify";

export default function Users({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      toast.success("Role updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading users...</p>
      </div>
    );

  if (!users.length)
    return (
      <div className="text-center mt-10 text-gray-700">
        <p>No users found.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        All Registered Users
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">#</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Username</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.phone || "—"}</td>
                <td className="px-4 py-2 text-sm">
                  {currentUser?.id === user.id ? (
                    <span className="px-2 py-1 rounded-full bg-gray-300 text-gray-700 text-xs font-semibold">
                      {user.role} (You)
                    </span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={updatingId === user.id}
                      className={`border border-gray-300 px-2 py-1 rounded text-sm font-semibold cursor-pointer ${
                        user.role === "admin"
                          ? "bg-red-500 text-white"
                          : user.role === "seller"
                          ? "bg-yellow-300 text-gray-800"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      <option value="admin">Admin</option>
                      <option value="seller">Seller</option>
                      <option value="customer">Customer</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
