import React from "react";
import CategoryMensClothing from "./CategoryMensClothing";

export default function MensClothing() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-labelledby="mens-clothing-hero-heading">
        <h1 id="mens-clothing-hero-heading">Get Branded Clothes</h1>
        <p className="hero-tagline">
          Discover the latest trends in men's fashion.
        </p>
      </section>

      <section aria-labelledby="mens-clothing-category-heading" className="category-section">
        <h2 id="mens-clothing-category-heading" className="visually-hidden">
          Browse Men's Clothing Categories
        </h2>
        <CategoryMensClothing />
      </section>
    </main>
  );
}
