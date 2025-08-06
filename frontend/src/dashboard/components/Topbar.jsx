import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Topbar = ({ toggleSidebar }) => {
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
    <div className="h-16 bg-[#1e1e2f] text-white shadow z-50 px-4 flex items-center justify-between font-sans sticky top-0 w-full">
      {/* Left: Hamburger + User */}
      <div className="flex items-center gap-4">
        {/* Hamburger on Mobile */}
        <button
          className="text-xl md:hidden"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4a4a60] flex items-center justify-center text-sm font-semibold">
            {getInitials()}
          </div>
          <span className="text-base font-medium text-gray-200 hidden sm:inline-block">
            Welcome, {user?.firstName || "Admin"}
          </span>
        </div>

        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          className="hidden sm:inline-block px-4 py-2 text-sm font-bold rounded-md bg-indigo-500 text-white shadow hover:bg-indigo-600 transition"
        >
          Home
        </button>
      </div>

      {/* Logout */}
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
