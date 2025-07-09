import React from "react";
import CategoryWomensClothing from "./CategoryWomensClothing.jsx";
import './Clothing.css'

export default function WomensClothing() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-labelledby="womens-clothing-hero-heading">
        <h1 id="womens-clothing-hero-heading">Get Branded Clothes</h1>
        <p className="hero-tagline">
          Discover the latest trends in women's fashion.
        </p>
      </section>

      <section aria-labelledby="womens-clothing-category-heading" className="category-section">
        <h2 id="womens-clothing-category-heading" className="visually-hidden">
          Browse Women's Clothing Categories
        </h2>
        <CategoryWomensClothing />
      </section>
    </main>
  );
}
