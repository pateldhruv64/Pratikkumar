// import React, { useEffect, useState } from 'react';
// import axios from '../services/axios';

// const Products = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('/api/products');
//         setAllProducts(res.data);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // 🔍 Filter products based on searchTerm (case insensitive)
//   const filteredProducts = allProducts.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Our Products</h2>

//       {/* 🔍 Search Bar */}
//       <div className="max-w-md mx-auto mb-10">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//         />
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p className="text-center text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProducts.map(product => (
//             <div
//               key={product._id}
//               className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition"
//             >
//               <img
//                 src={`http://localhost:5000${product.image}`}
//                 alt={product.name}
//                 className="w-full h-48 object-contain mb-4"
//               />
//               <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.name}</h3>
//               <p className="text-sm text-gray-600 mb-4">{product.description}</p>

//               {product.brochure && (
//                 <a
//                   href={`http://localhost:5000${product.brochure}`}
//                   download
//                   className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
//                 >
//                   Download Brochure
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

// new code //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 🔥 Debounce logic (runs after user stops typing for 300ms)
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delay); // cleanup
  }, [searchTerm]);

  // 🟦 Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setAllProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Use debouncedSearch for filtering
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Our Products
      </h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition"
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />

              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {product.description}
              </p>
              {/* 
              {product.brochure && (
                <a
                  href={`http://localhost:5000${product.brochure}`}
                  download
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  Download Brochure
                </a>
              )} */}

              {/* product pdf mate no new code */}
              {product.brochure && (
                <a
                  href={`http://localhost:5000${product.brochure}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  View Product Brochure
                </a>
              )}
              {/* //////////////////////////////////////////////////////////////////////////////////// */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
