import React from 'react';
import useInView from "../hooks/useInView";

const HowItWorks = () => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-in-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <section className="w-full bg-[#f9f9f9] py-10 px-4 sm:px-8 md:px-16 font-sans">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-wide">
          HOW IT WORKS
        </h2>

        <div className="bg-white max-w-4xl mx-auto rounded-md shadow-md p-6 sm:p-10 space-y-4 text-gray-800">
          <h3 className="text-xl sm:text-2xl font-semibold">Shop at Source</h3>
          <h4 className="text-lg sm:text-xl font-medium text-gray-700">How Jenatti Works</h4>
          <p className="text-sm sm:text-base leading-relaxed">
            Clothing4U is an online modest fashion marketplace. We partner with trusted brands
            to bring you curated pieces from around the world. When you find something you
            love, we’ll direct you to the brand’s website to complete your purchase directly
            with them.
          </p>
          <p className="font-semibold text-sm sm:text-base">
            Products are shipped and fulfilled by our brand partners.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
