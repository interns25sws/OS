import React from "react";
import useInView from "../hooks/useInView";
import "./Categories.css";

import OverSized from "../assets/Images/Oversized.jpg";
import AllBottom from "../assets/Images/Allbottom.jpg";
import shirts from "../assets/Images/shirts.jpg";
import Polos from "../assets/Images/polos.jpg";
import Shorts from "../assets/Images/shorts.jpg";
import Sneakers from "../assets/Images/sneakers.jpg";
import Slides from "../assets/Images/slides.jpg";
import jackets from "../assets/Images/jackets.jpg";

const categories = [
  { title: "OVERSIZED T-SHIRTS", img: OverSized },
  { title: "ALL BOTTOMS", img: AllBottom },
  { title: "SHIRTS", img: shirts },
  { title: "POLOS", img: Polos },
  { title: "SHORTS", img: Shorts },
  { title: "SNEAKERS", img: Sneakers },
  { title: "SLIDES & CLOGS", img: Slides },
  { title: "JACKETS & MORE", img: jackets },
];

const Categories = () => {
    const [ref, isInView] = useInView();
  return (
    <div ref={ref} className={`fade-up ${isInView ? "animate" : ""}`}>
      {/* your content */}
    <div className="categories-container">
      <h2 className="categories-title">CATEGORIES</h2>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <img src={cat.img} alt={cat.title} className="category-image" />
            <span className="category-label">{cat.title}</span>
          </div>
        ))}
      </div>
    </div>
        </div>
  );
};

export default Categories;
