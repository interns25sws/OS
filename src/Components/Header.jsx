import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

export default function  Header () {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">MyShop</Link>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="header-right">
          <input type="text" placeholder="Search..." className="search-input" />
          <Link to="/wishlist" className="icon">
            <i class="fa-solid fa-heart"></i>
          </Link>
          <Link to="/cart" className="icon">
            <i class="fa-solid fa-cart-shopping"></i>
          </Link>
          <Link to="/login" className="icon">
            <i class="fa-solid fa-user"></i>
          </Link>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
};


