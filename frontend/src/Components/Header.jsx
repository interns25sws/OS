import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationText, setLocationText] = useState("Your location");
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
          setLocationText(`Shipping to ${city} ${postcode}`);
        } catch (error) {
          setLocationText("Unable to fetch location");
        }
      },
      () => {
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
          <h1>FashionFiesta</h1>
        </div>

        <div
          className="user-location desktop-only"
          onClick={getUserLocation}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-location-dot"></i>
          <div className="location-description">
            <p className="normal-text">{locationText}</p>
            <p className="bold-text">Tap to update</p>
          </div>
        </div>

        <div className="header-right">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search clothing, brands, styles..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search fashion items"
            />
          </form>
        </div>

        <div className="user-icon desktop-only">
          <Link className="signin-icon" to="/UserLogin">
            <i className="fas fa-user" tabIndex="0"></i>
            <p>Sign In</p>
          </Link>
        </div>

        <div className="user-cart desktop-only">
          <i className="fa-solid fa-bag-shopping"></i>
          <p>My Bag</p>
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
            <p className="bold-text">Tap to update</p>
          </div>
        </div>

        <Link
          className="signin-icon menu-item"
          to="/UserLogin"
          onClick={closeMenu}
        >
          <i className="fas fa-user"></i>
          <p>Sign In</p>
        </Link>

        <div className="user-cart menu-item" onClick={closeMenu}>
          <i className="fa-solid fa-bag-shopping"></i>
          <p>My Bag</p>
        </div>
      </nav>

      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </header>
  );
}
