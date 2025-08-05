// src/pages/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  categorySlugMap,
  backendCategoryMap,
} from "../utils/categoryMap"; // ⬅️ import maps

const CategoryProducts = () => {
  const { categoryName } = useParams(); // this will be the slug
  const displayTitle = categorySlugMap[categoryName]; // e.g. "OVERSIZED T-SHIRTS"
  const backendCategory = backendCategoryMap[displayTitle]; // e.g. "Oversized T-Shirts"

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/category/${encodeURIComponent(backendCategory)}`);

        console.log("API response:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching category products:", err);
      }
    };

    if (backendCategory) {
      fetchCategoryProducts();
    }
  }, [backendCategory]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 capitalize">
        {displayTitle}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border p-3 rounded shadow hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.price} INR</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
