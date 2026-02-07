import React, { useState } from "react";
import axios from "../services/axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select a product image");
      return;
    }
    // console.log("💾 brochureFile:", brochureFile);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageFile);
    if (brochureFile) {
      formData.append("brochure", brochureFile);
      // console.log("brochure file =>", brochureFile);
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Clear form
      setName("");
      setDescription("");
      setImageFile(null);
      setBrochureFile(null);
      document.getElementById("imageInput").value = "";
      document.getElementById("brochureInput").value = "";
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="e.g. Paracetamol 500mg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="Short product description"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Brochure (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              id="brochureInput"
              onChange={(e) => setBrochureFile(e.target.files[0])}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
