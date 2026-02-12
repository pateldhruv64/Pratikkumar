import Product from "../models/productModel.js";

// ✅ GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CREATE new product (with image + brochure)
export const createProduct = async (req, res) => {
  try {
    const { name, description } = req.body;

    let image = "";
    let brochure = "";

    // 📸 Cloudinary image URL
    if (req.files?.image) {
      image = req.files.image[0].path;   // ✅ Changed
      // console.log('Cloudinary Image URL:', image);
    } else {
      return res.status(400).json({ message: "Image file is required" });
    }

    // 📄 Cloudinary brochure URL
    if (req.files?.brochure) {
      brochure = req.files.brochure[0].path;   // ✅ Changed
    }

    const newProduct = new Product({ name, description, image, brochure });
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updateFields = {
      name,
      description,
    };

    // 📸 New image upload
    if (req.files?.image) {
      updateFields.image = req.files.image[0].path;   // ✅ Changed
    } else if (req.body.image) {
      updateFields.image = req.body.image;
    }

    // 📄 New brochure upload
    if (req.files?.brochure) {
      updateFields.brochure = req.files.brochure[0].path;   // ✅ Changed
    } else if (req.body.brochure) {
      updateFields.brochure = req.body.brochure;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
