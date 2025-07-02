import React from "react";
import CategoryAutomativeEssentials from "./CategoryAutomativeEssentials.jsx";

export default function AutomativeEssentials () {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-label="Home Appliances Hero">
        <h1>Get Branded Clothes</h1>
      </section>
      <section aria-label="Browse by Category">
        <CategoryAutomativeEssentials />
      </section>
    </main>
    
  );
}
