import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the hook

export default function UserProfilePage() {
  const { user, logout } = useAuth(); // Get user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Navigate home after logout
  };

  if (!user) {
    // This is a fallback in case the page is accessed improperly
    return (
       <div className="flex items-center justify-center min-h-screen">
          <p>No user data found. Redirecting...</p>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {/* Assuming the name comes from the token's 'sub' claim */}
              {user.sub ? user.sub.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.sub}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          {/* ... Rest of your profile UI ... */}
        </div>
      </div>
    </div>
  );
}