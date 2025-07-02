import React from "react";
import CategoryElectronicGadgets from "./CategoryElectronicGadgets";

export default function ElectronicGadgets() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-label="Home Appliances Hero">
        <h1>Get Branded Clothes</h1>
      </section>
      <section aria-label="Browse by Category">
        <CategoryElectronicGadgets />
      </section>
    </main>
    
  );
}
