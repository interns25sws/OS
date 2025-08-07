import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import axios from "axios";

const SummerCollection = () => {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?limit=3&page=${page}&rand=${Math.random()}`
      );
      // Replace old products with the new products
      setProducts(res.data.products);
      console.log("Products fetched:", res.data.products); // Debug log
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // UseEffect hook to fetch products on component mount and periodically
  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      console.log("Re-fetching products..."); // Debug log
      setPage((prevPage) => prevPage + 1);
    }, 30 * 1000); 

    return () => clearInterval(interval); // Cleanup on unmount
  }, [page]);

  // Handle category navigation with async loading state
  const handleBrowseNow = async (categorySlug) => {
    setLoading(true);
    try {
      await navigate(`/category/${categorySlug}`);
    } catch (error) {
      console.error("Error during navigation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-normal ease-in-out-smooth  animate-fade-in motion-safe:animate-slide-up-fade ${
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
            {/* Mobile View */}
            <div className="flex md:hidden gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-start w-[85vw] sm:w-[75vw] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000/images/${item.images[0]}`}
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

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 justify-center">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f9f9f9] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={`http://localhost:5000/images/${item.images[0]}`}
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
