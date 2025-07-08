import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationText, setLocationText] = useState("User Location");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationText("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";
          const postcode = data.address.postcode || "";
          setLocationText(`Delivering to ${city} ${postcode}`);
        } catch (error) {
          setLocationText("Location fetch failed");
        }
      },
      (error) => {
        setLocationText("Location access denied");
      }
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>OnlineBazzar</h1>
        </div>

        <div
          className="user-location desktop-only"
          onClick={getUserLocation}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-location-dot"></i>
          <div className="location-description">
            <p className="normal-text">{locationText}</p>
            <p className="bold-text">Updated Location</p>
          </div>
        </div>

        <div className="header-right">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
          </form>
        </div>

        <div className="user-icon desktop-only">
          <Link className="signin-icon" to="/UserLogin">
            <i className="fas fa-user" tabIndex="0"></i>
            <p>Hello, Sign in</p>
          </Link>
        </div>

        <div className="user-cart desktop-only">
          <i className="fa-solid fa-cart-shopping"></i>
          <p>Cart</p>
        </div>

        <button
          className="hamburger mobile-only"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div
          className="user-location menu-item"
          onClick={() => {
            getUserLocation();
            closeMenu();
          }}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-location-dot"></i>
          <div className="location-description">
            <p className="normal-text">{locationText}</p>
            <p className="bold-text">Updated Location</p>
          </div>
        </div>

        <Link
          className="signin-icon menu-item"
          to="/UserLogin"
          onClick={closeMenu}
        >
          <i className="fas fa-user"></i>
          <p>Hello, Sign in</p>
        </Link>

        <div className="user-cart menu-item" onClick={closeMenu}>
          <i className="fa-solid fa-cart-shopping"></i>
          <p>Cart</p>
        </div>
      </nav>

      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </header>
  );
}
