import React from "react";
import CategoryElectronicGadgets from "./CategoryElectronicGadgets";
import "./HomeAppliances.css"; 

export default function ElectronicGadgets() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-labelledby="gadgets-hero-heading">
        <h1 id="gadgets-hero-heading">Explore Cutting-Edge Electronics</h1>
        <p className="hero-tagline">
          Discover the latest gadgets, from smart devices to innovative tech tools.
        </p>
      </section>

      <section
        className="category-section"
        aria-labelledby="gadgets-category-heading"
      >
        <h2 id="gadgets-category-heading" className="visually-hidden">
          Browse Electronic Gadget Categories
        </h2>
        <CategoryElectronicGadgets />
      </section>
    </main>
  );
}
