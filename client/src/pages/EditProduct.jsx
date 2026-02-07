import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      if (newImage) data.append('image', newImage);
      if (newBrochure) data.append('brochure', newBrochure);

      await axios.put(`/api/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Product updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert('❌ Failed to update product');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-600">✏️ Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Existing Image Preview */}
          {form.image && (
            <div>
              <p className="mb-1">Current Image:</p>
              <img
                src={`http://localhost:5000${form.image}`}
                alt="Preview"
                className="h-24 object-contain mb-2"
              />
            </div>
          )}

          {/* New Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Existing Brochure */}
          {form.brochure && (
            <div>
              <p className="mb-1">Current Brochure:</p>
              <a
                href={`http://localhost:5000${form.brochure}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                📄 View Current Brochure
              </a>
            </div>
          )}

          {/* New Brochure Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload New Brochure (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setNewBrochure(e.target.files[0])}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
