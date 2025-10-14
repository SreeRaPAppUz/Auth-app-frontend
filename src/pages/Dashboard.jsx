import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {user.username} 👋
      </h2>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Role:</span> {user.role}
      </p>

      {user.role === "admin" && (
        <div className="bg-blue-100 text-blue-800 border-l-4 border-blue-500 p-4 rounded-md shadow-md mb-4">
          You are logged in as an <strong>Admin</strong>. You can access user management.
        </div>
      )}

      {user.role === "seller" && (
        <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-4 rounded-md shadow-md mb-4">
          You are logged in as a <strong>Seller</strong>. You can manage your products and orders.
        </div>
      )}

      {user.role === "customer" && (
        <div className="bg-green-100 text-green-800 border-l-4 border-green-500 p-4 rounded-md shadow-md mb-4">
          You are logged in as a <strong>Customer</strong>. Browse and shop freely!
        </div>
      )}
    </div>
  );
}
