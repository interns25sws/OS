import React from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";

export default function Recommendations() {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 md:px-12 text-center font-sans">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            See personalized recommendations
          </h1>

          <button
            onClick={handleSignIn}
            className="bg-black text-white text-sm sm:text-base px-6 py-3 rounded hover:bg-gray-800 transition-colors duration-300 font-medium"
          >
            Sign in
          </button>

          <p className="mt-4 text-sm sm:text-base text-gray-700">
            New Customer?{" "}
            <span
              onClick={handleSignIn}
              className="text-black font-medium underline hover:text-gray-800 cursor-pointer"
            >
              Start Here
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
