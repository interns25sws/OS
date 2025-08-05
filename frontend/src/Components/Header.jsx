import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingBag } from "react-icons/fa";
import useInView from "../hooks/useInView";

const Header = ({ loggedInUser, cartItemCount = 0 }) => {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  const isAdminUser =
    loggedInUser &&
    ["admin", "super-admin", "sales-rep"].includes(loggedInUser.role);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <header className="sticky top-0 z-50 w-full bg-[#f9f9f9] shadow-md py-3">
        <div className="container max-w-[700px] mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-[#1c1e1f] text-white px-5 py-4 rounded-[35px] gap-4">
            
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-serif font-bold text-center sm:text-left w-full sm:w-auto">
              <Link to="/" className="text-white no-underline">
                Clothing4U<span className="text-[#c4a484]">.</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:max-w-md flex items-center bg-[#333] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#b0b0b0]"
              />
              <button
                className="text-[#c4a484] hover:text-white text-base"
                aria-label="Search products"
              >
                <i className="fa fa-search" />
              </button>
            </div>

            {/* Icons and Buttons */}
            <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-4 sm:gap-5">
              {/* Profile/Login */}
              {loggedInUser ? (
                <Link
                  to="/profile"
                  className="text-[#c4d6f3] flex items-center"
                  title="Go to Profile"
                  aria-label="User Profile"
                >
                  <FaUserCircle size={26} />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-[#c4d6f3] text-sm no-underline"
                  aria-label="Log in"
                >
                  Log In
                </Link>
              )}

              {/* Cart */}
              <div
                className="relative text-white text-lg cursor-pointer"
                onClick={() => navigate("/cart")}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
                aria-label="Go to cart"
              >
                <FaShoppingBag size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black rounded-full px-1.5 text-xs font-semibold leading-none">
                    {cartItemCount}
                  </span>
                )}
              </div>

              {/* Dashboard */}
              {isAdminUser && (
                <Link
                  to="/dashboard"
                  className="bg-[#222] text-white px-3 py-1.5 rounded-md text-sm no-underline"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
