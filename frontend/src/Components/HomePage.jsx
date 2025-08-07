import React, { useState, useEffect } from "react";
import useInView from "../hooks/useInView";

import image1 from "../assets/Images/4822920250804113341.jpg";
import image2 from "../assets/Images/8624420250722175226.jpg";
import image3 from "../assets/Images/catban-220250728235730.jpg";
import image4 from "../assets/Images/hompege.jpg";

const images = [image1, image2, image3, image4];

export default function HomePage() {
  const [ref, isInView] = useInView();
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-normal ease-in-out-smooth  animate-fade-in  animate-fade-in${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <section className="flex justify-center items-center bg-[#f9f9f9] min-h-[60vh] px-4 py-12 lg:px-10 overflow-hidden">
        {/* Slider Only */}
        <div className="w-full lg:max-w-full h-[400px] relative flex justify-center items-center overflow-hidden rounded-lg shadow-lg">
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
          />

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black text-xl w-10 h-10 flex items-center justify-center rounded-full shadow-md transition"
            onClick={() =>
              setCurrent((prev) => (prev - 1 + images.length) % images.length)
            }
            aria-label="Previous slide"
          >
            ←
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black text-xl w-10 h-10 flex items-center justify-center rounded-full shadow-md transition"
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}
