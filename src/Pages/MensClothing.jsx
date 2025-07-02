import React from "react";
import CategoryMensClothing from "./CategoryMensClothing";

export default function MensClothing() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-label="Home Appliances Hero">
        <h1>Get Branded Clothes</h1>
      </section>
      <section aria-label="Browse by Category">
        <CategoryMensClothing />
      </section>
    </main>
    
  );
}

