import React from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import Display1 from "../assets/Images/MensDisplayImage1.jpg";
import Display2 from "../assets/Images/MensDisplayImage2.jpg";
import Display3 from "../assets/images/MensDisplayImage3.jpg";

const items = [
  {
    title: "Street Wear",
    image: Display1,
    price: "$49.99",
  },
  {
    title: "Formal Wear",
    image: Display2,
    price: "$129.99",
  },
  {
    title: "Smart Jackets",
    image: Display3,
    price: "$89.99",
  },
];

const SummerCollection = () => {
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
            MENS BRANDED COLLECTION
          </h1>
          <p className="text-center text-xs sm:text-sm md:text-base uppercase tracking-wide text-gray-600 mb-8">
            Walk With Attitude & Elegance
          </p>

          <div className="w-full">
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

            <div className="hidden md:grid md:grid-cols-3 gap-8 justify-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f9f9f9] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[420px] lg:h-[500px] object-cover"
                  />
                  <div className="p-5 flex flex-col items-center">
                    <p className="text-lg font-semibold">{item.title}</p>
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
};

export default SummerCollection;
