import React from "react";
import CategorySection from "./CategorySection";
import FeaturedProducts from "./FeaturedProducts.jsx";
import Testimonials from "./Testimonials.jsx";
import "./HomeAppliances.css";

export default function HomeAppliances() {
  return (
    <main className="home-appliances-container">
      <section className="hero" aria-label="Home Appliances Hero">
        <h1>Bring Innovation Home</h1>
      </section>

      <section aria-label="Browse by Category">
        <CategorySection />
      </section>
      <section aria-label="Featured Products">
        <FeaturedProducts />
      </section>
      <section aria-label="Customer Testimonials">
        <Testimonials />
      </section>
    </main>
  );
}
