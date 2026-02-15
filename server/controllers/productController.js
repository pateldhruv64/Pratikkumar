import Product from "../models/productModel.js";

// GET all products (with optional pagination)
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    let query = Product.find().sort({ createdAt: -1 });

    if (page > 0 && limit > 0) {
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const products = await query.lean();

    // If paginated, also return total count
    if (page > 0 && limit > 0) {
      const total = await Product.countDocuments();
      return res.status(200).json({ products, total, page, limit });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE new product (with image + brochure)
export const createProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    let image = "";
    let brochure = "";

    if (req.files?.image) {
      image = req.files.image[0].path;
    } else {
      return res.status(400).json({ message: "Image file is required" });
    }

    if (req.files?.brochure) {
      brochure = req.files.brochure[0].path;
    }

    const newProduct = new Product({ name, description, category: category || '', image, brochure });
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const updateFields = { name, description, category: category || '' };

    if (req.files?.image) {
      updateFields.image = req.files.image[0].path;
    } else if (req.body.image) {
      updateFields.image = req.body.image;
    }

    if (req.files?.brochure) {
      updateFields.brochure = req.files.brochure[0].path;
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
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE product
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
