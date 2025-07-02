import React from "react";
import CategoryWomensClothing from "./CategoryWomensClothing.jsx";

export default function WomensClothing() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-label="Home Appliances Hero">
        <h1>Get Branded Clothes</h1>
      </section>
      <section aria-label="Browse by Category">
        <CategoryWomensClothing />
      </section>
    </main>
    
  );
}