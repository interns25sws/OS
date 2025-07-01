import react from "react";
import CategorySection from "./CategorySection";
import FeaturedProducts from "./FeaturedProducts.jsx";
import Testimonials from "./Testimonials.jsx";
import "./HomeAppliances.css";

export default function HomeAppliances() {
  return (
    <div>
      <div className="hero">
        <h1>Bring Innovation Home</h1>
        <p>Smart, efficient, and stylish appliances for every room.</p>
        <button className="button">Shop Now</button>
      </div>

      <CategorySection /> 
      <FeaturedProducts /> 
      <Testimonials />                                                         
    </div>
  );
}
