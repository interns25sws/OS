import React from "react";
import useInView from "../hooks/useInView";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <footer className="bg-black text-gray-300 pt-12 pb-6 px-4 sm:px-8 lg:px-16 font-sans">
        <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              About Clothing4U
            </h4>
            <p className="text-sm leading-relaxed text-gray-400">
              Clothing4U offers stylish, sustainable, and affordable fashion.
              We're committed to quality, comfort, and empowering individuality
              through what you wear.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              Stay Updated
            </h4>
            <form
              className="flex flex-col sm:flex-row items-center gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md text-sm bg-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2"
              >
                <FaEnvelope className="text-base" /> Subscribe
              </button>
            </form>
            <p className="mt-3 text-sm text-gray-400">
              Join our newsletter for updates and offers.
            </p>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition text-xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition text-xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Clothing4U. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
