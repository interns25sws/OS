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
          <h1>
            <Link to="/">OnlineBazzar</Link>
          </h1>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/shop" onClick={closeMenu}>
            Shop
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        <div className="header-right">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
          />

          <div className="icon">
            <Link to="/UserLogin">
              <i className="fas fa-user" tabIndex="0"></i>
            </Link>
          </div>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </header>
  );
}
