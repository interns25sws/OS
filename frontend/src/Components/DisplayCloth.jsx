import React from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import TrendingImage1 from "../assets/Images/TrendProductImage1.jpg";
import TrendingImage2 from "../assets/Images/TrendProductImage2.jpg";
import TrendingImage3 from "../assets/Images/TrendProductImage3.jpg";
import TrendingImage4 from "../assets/Images/TrendProductImage4.jpg";
import ActiveWear from "../assets/Images/ActiveWear.jpeg";
import HoodiesImage from "../assets/Images/Newhoodie.jpg";

const products = [
  { name: "JOG 2.0 PANTS", image: TrendingImage1 },
  { name: "Summer Tops", image: TrendingImage2 },
  { name: "Earrings", image: TrendingImage3 },
  { name: "Branded Shoes", image: TrendingImage4 },
  { name: "Active Wear", image: ActiveWear },
  { name: "Long Sleeve Hoodies", image: HoodiesImage },
];

export default function ProductShowcase() {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={`transition-all duration-normal ease-in-out-smooth   animate-fade-in  motion-safe:animate-slide-up-fade ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <section className="bg-[#f9f9f9] px-4 py-12 flex flex-col items-center text-center">
        <h1 className="font-bold text-[#222] mb-2 leading-tight text-[2.5rem] sm:text-[1.7rem] md:text-[3rem] xl:text-[3.2rem]">
          MODESTY x AESTHETIC
        </h1>
        <p className="text-[#444444cb] uppercase tracking-wide font-semibold mb-8 text-sm sm:text-[0.6rem] md:text-base xl:text-[1.125rem]">
          WALKOUT WITH ELEGANCE & COMFORT
        </p>

        {/* Swiper Carousel */}
        <div className="w-full max-w-[1200px]">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.3}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="pb-10"
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#f9f9f9] rounded shadow hover:shadow-xl transition-all duration-300 cursor-pointer relative w-full h-full">
                  <img
                    src={item.image}
                    alt={`Product image of ${item.name}`}
                    className="w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[400px] object-cover rounded"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 text-white font-bold text-sm md:text-base uppercase shadow pointer-events-none">
                    {item.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Browse Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/shop")}
            className="text-[#333] border border-[#333] hover:border-2 hover:border-black hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 rounded text-base sm:text-sm sm:px-4 sm:py-2"
          >
            Browse Now
          </button>
        </div>
      </section>
    </div>
  );
}
