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
      className={`transition-all duration-normal ease-in-out-smooth   animate-fade-in motion-safe:animate-slide-up-fade${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <section className="py-12 px-4 md:px-8  bg-[#f9f9f9] text-center">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold mb-8 text-gray-800">
          CATEGORIES
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
          {categories.map((cat, index) => {
            const matchedSlug = Object.keys(categorySlugMap).find(
              (slug) => categorySlugMap[slug] === cat.title
            );

            return (
              <Link
                key={index}
                to={`/category/${matchedSlug}`}
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                aria-label={`View products in ${cat.title}`}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-48 sm:h-56 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-black/20 text-white text-sm md:text-base font-medium text-center py-2">
                  {cat.title}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Categories;
