import React from "react";
import "./HomeAppliances.css";
import CategoryHomeAppliances from "./CategoryHomeAppliances.jsx";

export default function HomeAppliances() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-label="Home Appliances Hero">
        <h1>Bring Innovation Home</h1>
      </section>

      <section aria-label="Browse by Category">
        <CategoryHomeAppliances />
      </section>
    </main>
  );
}
