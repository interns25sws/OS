import React from "react";
import useInView from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import productImage from "../assets/Images/ClothImage1.jpg";

export default function HomePage() {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <section className="flex flex-wrap lg:flex-nowrap justify-center items-center bg-[#f9f9f9] min-h-[60vh] px-4 py-12 lg:px-10 font-sans overflow-hidden">
        {/* Content */}
        <div className="w-full lg:max-w-[600px] flex flex-col justify-center text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-[2.5rem] lg:text-[2.5rem] font-extrabold text-[#111] leading-snug">
            Effortless Style Starts Here
          </h1>
          <p className="text-[1.125rem] lg:text-[1.125rem] text-[#555] mt-2 mb-8 leading-relaxed">
            Explore modern fashion tailored for you.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#111] hover:bg-[#333] text-white text-base font-semibold px-10 py-3 rounded-full transition duration-300 self-center lg:self-start"
            aria-label="Navigate to shop page"
          >
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="w-full lg:max-w-[600px] flex justify-center items-center">
          <img
            src={productImage}
            alt="Featured Product"
            className="w-full max-w-full h-auto object-contain rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
