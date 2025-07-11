import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

const Header = ({ loggedInUser }) => {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <div ref={ref} className={`fade-up ${isInView ? "animate" : ""}`}>
      {/* your content */}

      <header className="custom-header">
        <div className="nav-bar">
          <div className="logo">
            <Link to="/">
              Clothing4U<span className="dot">.</span>
            </Link>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
            <button className="search-btn">
              <i className="fa fa-search" />
            </button>
          </div>

          <div className="nav-right">
            {loggedInUser ? (
              <Link
                to="/profile"
                className="user-icon-link"
                title="Go to Profile"
              >
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
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
              aria-label="Go to cart"
            >
              <i className="fa-solid fa-bag-shopping" />
              <span className="cart-count">0</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
