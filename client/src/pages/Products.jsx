import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from '../services/axios';

const CATEGORIES = [
  "All",
  "Tablets",
  "Capsules",
  "Syrups",
  "Injections",
  "Ointments",
  "Drops",
  "Powders",
  "Other",
];

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Debounce logic
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setAllProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filter by search + category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 transition-colors duration-300">
      <Helmet>
        <title>Our Products | Crejap Pharma Pvt. Ltd.</title>
        <meta name="description" content="Browse our wide range of WHO-GMP certified pharmaceutical products including tablets, syrups, capsules and more." />
      </Helmet>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 dark:text-blue-400">
        Our Products
      </h2>

      {/* Search + Category Filter Row */}
      <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition border border-transparent dark:border-gray-700"
            >
              <img
                src={
                  product.image.startsWith('http')
                    ? product.image
                    : `${import.meta.env.VITE_API_URL}${product.image}`
                }
                alt={product.name}
                loading="lazy"
                className="w-full h-48 object-contain mb-4 bg-white rounded p-2"
              />

              {product.category && (
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
              )}

              <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {product.description}
              </p>

              {product.brochure && (
                <a
                  href={
                    product.brochure.startsWith('http')
                      ? product.brochure
                      : `${import.meta.env.VITE_API_URL}${product.brochure}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm mb-2 sm:mb-0 sm:mr-2"
                >
                  View Brochure
                </a>
              )}

              <a
                href={`https://wa.me/919876543210?text=Hello, I am interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
              >
                Enquire Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
