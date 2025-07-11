import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <header className="custom-header">
      <div className="nav-bar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            Clothing4U<span className="dot">.</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
          />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>

        {/* User Icon or Login + Cart */}
        <div className="nav-right">
          {loggedInUser ? (
            <Link to="/profile" className="user-icon-link" title="Go to Profile">
              <FaUserCircle size={28} />
            </Link>
          ) : (
            <Link to="/login" className="login-link">
              Log In
            </Link>
          )}

          <div
            className="cart-icon"
            onClick={() => navigate("/cart")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
            aria-label="Go to cart"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
