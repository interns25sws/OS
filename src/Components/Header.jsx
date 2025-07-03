import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>OnlineBazzar</h1>
        </div>

        <div className="user-location">
          <i class="fa-solid fa-location-dot"></i>
          <div className="location-description">
            <p className="normal-text">Delivering to vadodara 390001</p>
            <p className="bold-text">Updated Location</p>
          </div>
        </div>

        <div className="header-right">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
          />
        </div>

        <div className="user-icon">
          <Link className="signin-icon" to="/UserLogin">
            <i className="fas fa-user" tabIndex="0"></i>
          </Link>
          <p>Hello , Sign in</p>
        </div>

        <div className="user-cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <p>Cart</p>
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </header>
  );
}
