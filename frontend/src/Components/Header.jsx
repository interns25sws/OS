import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="custom-header">
      <div className={`nav-bar ${menuOpen ? "active" : ""}`}>
        <div className="nav-top">
          <div className="logo">
            <Link to="/">
              Clothing4U<span className="dot">.</span>
            </Link>
          </div>

          <button className="search-icon-mobile">
            <i className="fa fa-search"></i>
          </button>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="nav-bottom">
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

          <div className="nav-right">
            <Link to="/login" className="login-link">
              Log In
            </Link>

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
      </div>
    </header>
  );
}
