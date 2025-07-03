import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationText, setLocationText] = useState("Delivering to vadodara 390001");

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
          const city = data.address.city || data.address.town || data.address.village || "Unknown";
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

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>OnlineBazzar</h1>
        </div>

        <div className="user-location" onClick={getUserLocation} style={{ cursor: "pointer" }}>
          <i className="fa-solid fa-location-dot"></i>
          <div className="location-description">
            <p className="normal-text">{locationText}</p>
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
          <p>Hello, Sign in</p>
        </div>

        <div className="user-cart">
          <i className="fa-solid fa-cart-shopping"></i>
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
