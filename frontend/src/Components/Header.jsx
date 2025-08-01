import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingBag } from "react-icons/fa";
import useInView from "../hooks/useInView";
import "./Header.css";

const Header = ({ loggedInUser, cartItemCount = 0 }) => {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  const isAdminUser =
    loggedInUser &&
    (loggedInUser.role === "admin" ||
      loggedInUser.role === "super-admin" ||
      loggedInUser.role === "sales-rep");

  return (
    <div ref={ref} className={`fade-up ${isInView ? "animate" : ""}`}>
      <header className="custom-header">
        <div className="nav-bar">
          <div className="logo">
            <Link to="/">
              Clothing4U<span className="dot">.</span>
            </Link>
          </div>

          <div className="search-bar-header">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input-header"
            />
            <button className="search-btn" aria-label="Search products">
              <i className="fa fa-search" />
            </button>
          </div>

          <div className="nav-right">
            {loggedInUser ? (
              <Link
                to="/profile"
                className="user-icon-link"
                title="Go to Profile"
                aria-label="User Profile"
              >
                <FaUserCircle size={28} />
              </Link>
            ) : (
              <Link to="/login" className="login-link" aria-label="Log in">
                Log In
              </Link>
            )}

            <div
              className="cart-icon"
              onClick={() => navigate("/cart")}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
              aria-label="Go to cart"
            >
              <FaShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="cart-count" aria-live="polite">
                  {cartItemCount}
                </span>
              )}
            </div>

            {isAdminUser && (
              <Link to="/dashboard" className="admin-button">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
