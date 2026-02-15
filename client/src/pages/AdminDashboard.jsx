import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/axios';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [adminData, setAdminData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dashboardInfo, setDashboardInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [catalogPdf, setCatalogPdf] = useState(null);
  const [stats, setStats] = useState({ products: 0, contacts: 0, newsletters: 0 });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard');
        setDashboardInfo(res.data);
      } catch (err) {
        console.error('Dashboard error:', err.response?.data?.message);
      }
      const adminName = sessionStorage.getItem('adminName');
      const lastLogin = sessionStorage.getItem('lastLogin');
      if (adminName) {
        setDashboardInfo({ adminName, lastLogin });
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
        setStats((prev) => ({ ...prev, products: data.length }));
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    const fetchContacts = async () => {
      try {
        const res = await axios.get('/api/contact');
        setStats((prev) => ({ ...prev, contacts: Array.isArray(res.data) ? res.data.length : 0 }));
      } catch (err) {
        // silent — admin might not have access or endpoint may fail
      }
    };

    const fetchNewsletters = async () => {
      try {
        const res = await axios.get('/api/newsletter');
        setStats((prev) => ({ ...prev, newsletters: Array.isArray(res.data) ? res.data.length : 0 }));
      } catch (err) {
        // silent
      }
    };

    fetchDashboard();
    fetchProducts();
    fetchContacts();
    fetchNewsletters();
  }, []);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('/api/admin/register', adminData);
      setMessage(res.data.message || 'Admin added!');
      setAdminData({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding admin');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setStats((prev) => ({ ...prev, products: prev.products - 1 }));
      alert('✅ Product deleted!');
    } catch (err) {
      alert('❌ Failed to delete');
    }
  };

  const handleCatalogUpload = async (e) => {
    e.preventDefault();
    if (!catalogPdf) return alert('Please select a PDF file first');

    const formData = new FormData();
    formData.append('catalog', catalogPdf);

    try {
      await axios.post('/api/admin/upload-catalog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Catalog PDF uploaded successfully!');
      setCatalogPdf(null);
    } catch (err) {
      console.error('Catalog upload error:', err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Failed to upload catalog PDF';
      alert(`❌ Error: ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md transition-colors duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400 text-center">
          Admin Dashboard
        </h1>

        {dashboardInfo && (
          <div className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <p>👤 Logged in as: <strong>{dashboardInfo.adminName}</strong></p>
            <p>📅 Last Login: {dashboardInfo.lastLogin || 'N/A'}</p>
          </div>
        )}

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.products}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Products</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.contacts}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Contact Messages</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.newsletters}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Newsletter Subscribers</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Link to="/admin/add-product"
            className="bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition text-sm sm:text-base shadow-md">
            ➕ Add Product
          </Link>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base shadow-md">
            ➕ Add Admin
          </button>
          <Link to="/admin/newsletters"
            className="bg-purple-500 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition text-sm sm:text-base shadow-md">
            📨 View Newsletters
          </Link>
          <Link to="/admin/contacts"
            className="bg-indigo-500 text-white text-center py-3 rounded-lg hover:bg-indigo-600 transition text-sm sm:text-base shadow-md">
            📥 View Contact Messages
          </Link>
        </div>

        {showForm && (
          <form onSubmit={handleAddAdmin} className="space-y-4 mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            {message && <p className="text-green-600 dark:text-green-400">{message}</p>}
            {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
            <input type="text" name="username" placeholder="Username" value={adminData.username}
              onChange={handleChange} className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300" required />
            <input type="email" name="email" placeholder="Email" value={adminData.email}
              onChange={handleChange} className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300" required />
            <input type="password" name="password" placeholder="Password" value={adminData.password}
              onChange={handleChange} className="w-full px-4 py-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Admin
            </button>
          </form>
        )}

        {/* Product List Table */}
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">📦 Products</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Name</th>
                <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Category</th>
                <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Image</th>
                <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700 transition-colors">
                  <td className="px-4 py-2 border-r dark:border-gray-700">{product.name}</td>
                  <td className="px-4 py-2 border-r dark:border-gray-700">
                    {product.category ? (
                      <span className="bg-blue-100 dark:bg-blue-900 dark:text-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {product.category}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-r dark:border-gray-700">
                    <img
                      src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}${product.image}`}
                      alt={product.name}
                      className="w-16 h-12 object-contain bg-white rounded p-1"
                    />
                  </td>
                  <td className="px-4 py-2 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                    <Link to={`/admin/edit-product/${product._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-center text-xs">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-center text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Catalog Upload Form */}
        <div className="mt-10 border-t dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">
            📄 Upload Our Product Catalog (PDF)
          </h2>
          <form onSubmit={handleCatalogUpload}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <div className="w-full sm:w-auto">
              <input type="file" accept="application/pdf"
                onChange={(e) => setCatalogPdf(e.target.files[0])}
                className="px-4 py-2 border rounded w-full sm:w-[300px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required />
              {catalogPdf && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left truncate">
                  📎 Selected: {catalogPdf.name}
                </p>
              )}
            </div>
            <button type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full sm:w-auto">
              Upload Catalog PDF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
