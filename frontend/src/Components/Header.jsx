import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="custom-header">
      <div className="nav-bar">
        <div className="logo">
          <Link to="/">Clothing4U<span className="dot">.</span></Link>
        </div>

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
       
          <Link to="/UserLogin" className="login-link">
            Log In
          </Link>

          <div className="cart-icon">
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
