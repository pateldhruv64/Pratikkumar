import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg";
import Newsletter from "../components/Newsletter";
import axios from "../services/axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        // const res = await axios.get("/products");

        setProducts(res.data.slice(0, 3)); // ✅ Show only 3 products
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div className="text-gray-800">
      {/* Banner Section */}
      <section className="relative">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
    <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl">
      Welcome to <span className="text-red-600">DhruvCure </span>
      <span className="text-gray-300">Pharmaceuticals</span>
    </h1>
  </div>
      </section>

     

      {/* Product Highlight Section */}
      <section className="py-10 px-4 sm:px-8 md:px-16 bg-gray-100">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white  hover:shadow-lg transition rounded-2xl shadow-md p-4 "
            >
              <Link to="/products" className="block">
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.image}`}

                  alt={product.name}
                  className="w-full h-40 sm:h-44 object-contain mb-3"
                />
                <h3 className="text-base sm:text-lg font-medium mb-1">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {product.description.slice(0, 60)}...
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
          >
            View More Products
          </Link>
        </div>
      </section>
      {/* Mission & Vision Section */}


{/* Why Choose Us Section */}
{/* Why Choose Us Section */}
<section className="py-10 px-4 sm:px-8 md:px-16 bg-gray-100">
  <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Why Choose Us?</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
      <p className="text-sm text-gray-600">We adhere to strict quality protocols and international standards.</p>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Wide Product Range</h3>
      <p className="text-sm text-gray-600">We offer a diverse range of pharma formulations across all therapeutic categories.</p>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">24x7 Support</h3>
      <p className="text-sm text-gray-600">Our team is always available to assist your business needs.</p>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">WHO-GMP Certified</h3>
      <p className="text-sm text-gray-600">We follow WHO-GMP guidelines for manufacturing excellence.</p>
    </div>
  </div>
</section>


{/* Testimonials Section */}
{/* Testimonials Section */}
<section className="py-10 px-4 sm:px-8 md:px-16 bg-white">
  <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">What Our Clients Say</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div className="bg-gray-50 p-4 rounded shadow">
      <p className="text-sm text-gray-700 mb-2">"Their product quality is outstanding and complies with all regulatory norms."</p>
      <h4 className="font-semibold text-sm">— Dr. Desai, Ahmedabad</h4>
    </div>
    <div className="bg-gray-50 p-4 rounded shadow">
      <p className="text-sm text-gray-700 mb-2">"We’ve had a consistent and reliable experience sourcing pharma supplies."</p>
      <h4 className="font-semibold text-sm">— MedCare Distributors, Mumbai</h4>
    </div>
    <div className="bg-gray-50 p-4 rounded shadow">
      <p className="text-sm text-gray-700 mb-2">"Highly professional team with great customer understanding and support."</p>
      <h4 className="font-semibold text-sm">— Dr. A. Sharma, Bengaluru</h4>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="py-10 px-4 sm:px-8 md:px-16 bg-gray-100 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Download Our Product Catalog
        </h2>
       <a
 href={`${import.meta.env.VITE_API_URL}/assets/catalog.pdf`}

   target="_blank"
    rel="noopener noreferrer"
  download
  className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base"
>
  Download Now
</a>

      </section>

      
    </div>
  );
};

export default Home;
