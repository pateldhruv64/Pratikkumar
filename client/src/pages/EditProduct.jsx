import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

const CATEGORIES = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Injections",
  "Ointments",
  "Drops",
  "Powders",
  "Other",
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    brochure: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [newBrochure, setNewBrochure] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setForm(res.data);
      } catch (err) {
        alert('Failed to fetch product');
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('category', form.category || '');
      if (newImage) data.append('image', newImage);
      if (newBrochure) data.append('brochure', newBrochure);

      await axios.put(`/api/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Product updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert('❌ Failed to update product');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">✏️ Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Product Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select name="category" value={form.category || ''} onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>

          {form.image && (
            <div>
              <p className="mb-1 text-gray-700 dark:text-gray-300">Current Image:</p>
              <img
                src={form.image.startsWith("http") ? form.image : `${import.meta.env.VITE_API_URL}${form.image}`}
                alt="Preview" className="h-24 object-contain mb-2 bg-white rounded p-1" />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Upload New Image</label>
            <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-white" />
          </div>

          {form.brochure && (
            <div>
              <p className="mb-1 text-gray-700 dark:text-gray-300">Current Brochure:</p>
              <a
                href={form.brochure.startsWith("http") ? form.brochure : `${import.meta.env.VITE_API_URL}${form.brochure}`}
                target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
                📄 View Current Brochure
              </a>
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Upload New Brochure (PDF)</label>
            <input type="file" accept=".pdf" onChange={(e) => setNewBrochure(e.target.files[0])}
              className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-white" />
          </div>

          <button type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
