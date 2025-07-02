import React, { useState, useEffect } from "react";
import "./Homepage.css";

import slider1 from "../assets/ClothImage1.jpg";
import slider2 from "../assets/clothImage2.jpg";
import slider3 from "../assets/ClothImage3.jpg";
  

const sliderImages = [
  { src: slider1, alt: "Summer Collection" },
  { src: slider2, alt: "Winter Collection" },
  { src: slider3, alt: "New Arrivals" },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); 
    return () => clearInterval(interval); 
  }, [current]);

  return (
    <section className="section">
      <div className="slider">
        {/* <button className="slider-btn" onClick={prevSlide}>&lt;</button> */}
        <img
          src={sliderImages[current].src}
          alt={sliderImages[current].alt}
          className="slider-image"
        />
        {/* <button className="slider-btn" onClick={nextSlide}>&gt;</button> */}
      </div>
    </section>
  );
}