import React from "react";
import "./HomeAppliances.css";
import CategoryHomeAppliances from "./CategoryHomeAppliances.jsx";

export default function HomeAppliances() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Bring Innovation Home</h1>
        <p className="hero-tagline">
          Explore the latest in smart and energy-efficient home appliances.
        </p>
      </section>

      <section
        className="category-section"
        aria-labelledby="category-heading"
      >
        <h2 id="category-heading" className="visually-hidden">
          Browse Home Appliance Categories
        </h2>
        <CategoryHomeAppliances />
      </section>
    </main>
  );
}
