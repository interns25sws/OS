import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="h-16 bg-[#1e1e2f] text-white shadow z-50 px-4 md:px-6 flex items-center justify-between font-sans sticky top-0">
      {/* Left: Hamburger and Profile */}
      <div className="flex items-center gap-4">
        {/* Hamburger only on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-white text-xl focus:outline-none"
        >
          <FiMenu />
        </button>

        {/* Avatar + Name */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4a4a60] flex items-center justify-center text-sm font-semibold">
            {getInitials()}
          </div>
          <span className="text-base font-medium text-gray-200">
            Welcome, {user?.firstName || "Admin"}
          </span>
        </div>

        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          className="hidden md:inline-block px-4 py-2 text-sm font-bold rounded-md bg-indigo-500 text-white shadow hover:bg-indigo-600 transition"
        >
          Home
        </button>
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden md:block px-4 py-2 text-sm font-medium rounded-md text-white shadow transition ${
          isHovered ? "bg-red-700" : "bg-red-600"
        }`}
      >
        Logout
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#1e1e2f] border-t border-gray-700 px-4 py-4 md:hidden flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4a4a60] flex items-center justify-center text-sm font-semibold">
              {getInitials()}
            </div>
            <span className="text-sm font-medium text-gray-200">
              Welcome, {user?.firstName || "Admin"}
            </span>
          </div>
          <button
            onClick={handleHomeClick}
            className="w-full text-left px-4 py-2 text-sm font-bold rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;
