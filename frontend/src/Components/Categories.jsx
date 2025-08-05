import React from "react";
import { Link } from "react-router-dom"; // import Link
import useInView from "../hooks/useInView";
import { categorySlugMap } from "../utils/categoryMap";


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
  { title: "SHIRT", img: shirts },
  { title: "POLOS", img: Polos },
  { title: "SHORTS", img: Shorts },
  { title: "SNEAKERS", img: Sneakers },
  { title: "SLIDES & CLOGS", img: Slides },
  { title: "JACKETS & MORE", img: jackets },
];

const Categories = () => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <section className="py-12 px-4 md:px-8  bg-[#f9f9f9] text-center">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold mb-8 text-gray-800">
          CATEGORIES
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${Object.keys(categorySlugMap).find(
                (slug) => categorySlugMap[slug] === cat.title
              )}`}
              className="relative group overflow-hidden rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-50 sm:h-48 md:h-56 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <span className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-60 text-white text-sm md:text-base font-semibold py-2">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
