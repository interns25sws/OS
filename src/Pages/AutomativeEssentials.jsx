import React from "react";
import CategoryAutomativeEssentials from "./CategoryAutomativeEssentials.jsx";

export default function AutomativeEssentials() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-labelledby="automative-hero-heading">
        <h1 id="automative-hero-heading">Drive with Confidence</h1>
        <p className="hero-tagline">
          Discover essential automotive products and accessories.
        </p>
      </section>

      <section aria-labelledby="automative-category-heading" className="category-section">
        <h2 id="automative-category-heading" className="visually-hidden">
          Browse Automotive Essentials Categories
        </h2>
        <CategoryAutomativeEssentials />
      </section>
    </main>
  );
}
