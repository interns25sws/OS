import React from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import MensTrend from "../assets/Images/menstrend.jpg";
import Shoes from "../assets/Images/Jordan.jpg";
import Womenstrend from "../assets/Images/womentrend.jpg";

const items = [
  {
    title: "Custom T-shirts",
    image: MensTrend,
    price: "49.99",
  },
  {
    title: "Air Jordan 1",
    image: Shoes,
    price: "129.99",
  },
  {
    title: "Aesthetic Wear",
    image: Womenstrend,
    price: "89.99",
  },
];

export default function SummerCollection() {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <section className="bg-[#f9f9f9] py-10 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            DEMANDING PRODUCTS
          </h1>
          <p className="text-center text-xs sm:text-sm md:text-base uppercase tracking-wide text-gray-600 mb-8">
            For those who know what they want.
          </p>

          <div className="w-full">
            {/* Mobile View - Horizontal Scroll */}
            <div className="flex md:hidden gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-start w-[85vw] sm:w-[75vw] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[340px] object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                  />
                  <div className="p-4 flex flex-col items-center">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.price}</p>
                    <button
                      onClick={() => navigate("/shop")}
                      className="mt-3 px-5 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Browse Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Grid Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 justify-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[420px] lg:h-[500px] object-cover"
                  />
                  <div className="p-5 flex flex-col items-center">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.price}</p>
                    <button
                      onClick={() => navigate("/shop")}
                      className="mt-3 px-5 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Browse Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
