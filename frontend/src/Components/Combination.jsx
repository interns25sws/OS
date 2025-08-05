import React from 'react';
import useInView from "../hooks/useInView";
import KoreaLook from "../assets/Images/Korealook.jpg";
import TexturedPolos from "../assets/Images/texturepolos.jpg";
import Plaidshirts from "../assets/Images/plaidshirts.jpg";
import ClassicBottoms from "../assets/Images/classicbottom.jpg";
import UrbanShirt from "../assets/Images/urbanshirt.jpg";
import BlazeSneakers from "../assets/Images/blaze sneakers.jpg";

const items = [
  { image: KoreaLook, alt: "Korean Look" },
  { image: TexturedPolos, alt: "Textured Polos" },
  { image: Plaidshirts, alt: "Plaid Shirts" },
  { image: ClassicBottoms, alt: "Classic Bottoms" },
  { image: UrbanShirt, alt: "Urban Shirts" },
  { image: BlazeSneakers, alt: "Blaze Sneakers" },
];

const SharpDressing = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ease-in-out transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="w-full bg-[#f9f9f9] py-8 sm:py-10 lg:py-14 px-4 sm:px-6 md:px-10 font-sans">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          SHARP DRESSING
        </h2>

        <div className="flex md:flex-wrap md:justify-center gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible px-1 sm:px-0 scroll-smooth snap-x md:snap-none">
          {items.map(({ image, alt }, index) => (
            <div
              key={index}
              className="flex-none snap-center md:snap-none w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover object-center select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharpDressing;
