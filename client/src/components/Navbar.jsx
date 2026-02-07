import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 400);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // 🧠 Track screen resize to show/hide menu on <400px
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 400);
      if (window.innerWidth >= 400) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🌫️ Blur Navbar on Scroll (any page)
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-white/50 backdrop-blur-md shadow-sm"
          : "bg-gray-100 shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo with hover effect */}
        <Link
          to="/"
          className="flex items-center space-x-2 max-w-[150px] sm:max-w-none overflow-hidden"
        >
          <img
            src={logo}
            alt="Pharma Logo"
            className="h-12 w-12 object-cover rounded-full border border-gray-300 shadow-sm flex-shrink-0"
          />
        </Link>

        {/* ☰ Hamburger icon (on mobile) */}
        {isMobileView && (
          <button
            onClick={toggleMenu}
            className="text-gray-700 md:hidden focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Navigation Links */}
        <nav
          className={`${
            isMobileView
              ? isOpen
                ? "block absolute top-16 left-0 w-full bg-white shadow-md"
                : "hidden"
              : "flex"
          } md:flex md:items-center md:space-x-6`}
        >
          <div
            className={`${
              isMobileView
                ? "flex flex-col items-start p-4 space-y-2"
                : "flex space-x-6"
            }`}
          >
            <Link
              to="/"
              onClick={closeMenu}
              className={`font-medium ${
                location.pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className={`font-medium ${
                location.pathname === "/products"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Products
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className={`font-medium ${
                location.pathname === "/about"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className={`font-medium ${
                location.pathname === "/contact"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
