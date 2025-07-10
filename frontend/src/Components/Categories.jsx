import React from "react";
import "./Categories.css";

import OverSized from "../assets/Oversized.jpg";
import AllBottom from "../assets/Allbottom.jpg";
import shirts from "../assets/shirts.jpg";
import Polos from "../assets/polos.jpg";
import Shorts from "../assets/shorts.jpg";
import Sneakers from "../assets/sneakers.jpg";
import Slides from "../assets/slides.jpg";
import jackets from "../assets/jackets.jpg";

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
  return (
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
  );
};

export default Categories;
