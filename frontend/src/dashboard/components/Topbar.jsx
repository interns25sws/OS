import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (err) {
        console.error("Invalid user data:", err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const getInitials = () => {
    if (!user) return "A";
    const { firstName, lastName, email } = user;
    if (firstName || lastName) {
      return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
    }
    return email?.[0]?.toUpperCase() || "U";
  };

  return (
    <div className="fixed top-0 left-[240px] right-0 h-16 bg-[#1e1e2f] text-white flex items-center justify-between px-6 shadow z-50 font-sans">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4a4a60] flex items-center justify-center text-sm font-semibold shadow text-white">
            {getInitials()}
          </div>
          <span className="text-base font-medium text-gray-200">
            Welcome, {user?.firstName || "Admin"}
          </span>
        </div>
        <button
          onClick={handleHomeClick}
          className="px-4 py-2 text-sm font-bold rounded-md bg-indigo-500 text-white shadow hover:bg-indigo-600 transition"
        >
          Home
        </button>
      </div>
      <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`px-4 py-2 text-sm font-medium rounded-md text-white shadow transition ${
          isHovered ? "bg-red-700" : "bg-red-600"
        }`}
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
