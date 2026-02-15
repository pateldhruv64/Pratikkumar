import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";
import banner from "../assets/banner.webp";
import axios from "../services/axios";

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    text: "Their product quality is outstanding and complies with all regulatory norms. Highly recommended!",
    author: "Dr. Desai",
    location: "Ahmedabad",
  },
  {
    id: 2,
    text: "We've had a consistent and reliable experience sourcing pharma supplies from Crejap. Best in class service.",
    author: "MedCare Distributors",
    location: "Mumbai",
  },
  {
    id: 3,
    text: "Highly professional team with great customer understanding and support. Timely deliveries always.",
    author: "Dr. A. Sharma",
    location: "Bengaluru",
  },
  {
    id: 4,
    text: "Crejap Pharma has been a trusted partner for our pharmacy chain. Excellent range of products.",
    author: "Wellness Pharmacy",
    location: "Pune",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [catalogUrl, setCatalogUrl] = useState("");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Fetch Products
        const prodRes = await axios.get("/api/products");
        const prodData = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.products || [];
        setProducts(prodData.slice(0, 3));

        // Fetch Settings (Catalog URL)
        const settingsRes = await axios.get("/api/admin/settings");
        setCatalogUrl(settingsRes.data.catalogUrl);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>Crejap Pharma Pvt. Ltd. | Quality Pharmaceutical Solutions</title>
        <meta name="description" content="Welcome to Crejap Pharma - Leading pharmaceutical company delivering WHO-GMP certified medicines. Explore our wide range of pharma products." />
        <link rel="preload" as="image" href={banner} fetchpriority="high" />
      </Helmet>

      {/* Banner Section */}
      <section className="relative">
        <img
          src={banner}
          alt="Crejap Pharma quality medicines and pharmaceutical products"
          className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
          fetchpriority="high"
          loading="eager"
          width="1920"
          height="400"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
          <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl drop-shadow-lg">
            Welcome to <span className="text-red-500">Crejap </span>
            <span className="text-gray-200">Pharma</span>
          </h1>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="py-12 px-4 sm:px-8 md:px-16 bg-gray-50 dark:bg-gray-900 min-h-[1400px] sm:min-h-[900px] md:min-h-[650px]">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-800">Our Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[450px] animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))
            : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition shadow-lg"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-800">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-blue-800 dark:text-blue-400">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-md transition">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Quality Assurance</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">Strict quality protocols & international standards.</p>
          </div>
          <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-md transition">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Wide Range</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">Diverse pharma formulations for all needs.</p>
          </div>
          <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-md transition">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">24x7 Support</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">Always available to assist your business needs.</p>
          </div>
          <div className="bg-red-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-md transition">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">WHO-GMP Certified</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">Manufacturing excellence guidelines followed.</p>
          </div>
        </div>
      </section>

      {/* 🔥 Testimonials Slider Section */}
      <section className="py-16 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">What Our Clients Say</h2>

        <div className="max-w-3xl mx-auto relative min-h-[200px] sm:min-h-[160px] flex items-center justify-center">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${index === currentTestimonial ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <p className="text-lg sm:text-xl italic font-light mb-4">"{t.text}"</p>
              <h3 className="font-bold text-lg text-blue-400">— {t.author}, <span className="text-gray-300 text-sm font-normal">{t.location}</span></h3>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`w-4 h-4 rounded-full transition-all ${index === currentTestimonial ? "bg-blue-500 w-8" : "bg-gray-500"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 sm:px-8 md:px-16 bg-gray-100 dark:bg-gray-900 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">
          Download Our Product Catalog
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Get the complete list of our products and specifications in a single PDF file.
        </p>
        <a
          href={catalogUrl || `${import.meta.env.VITE_API_URL}/assets/catalog.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold transition shadow-md"
        >
          <span>⬇️</span> Download Catalog
        </a>
      </section>
    </div>
  );
};

export default Home;
