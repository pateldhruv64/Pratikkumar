import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from '../services/axios';
import ProductCard from '../components/ProductCard';

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
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
