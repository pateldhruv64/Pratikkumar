import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

import upload from '../middleware/upload.js';
import protect from '../middleware/protect.js'; // 🔐 Verifies admin token

const router = express.Router();

// 🔓 Public Routes (No auth needed)
router.get('/', getAllProducts);         // Get all products
router.get('/:id', getProductById);      // Get single product by ID

// 🔐 Admin Protected Routes

// ✅ Create product with image + optional brochure
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'brochure', maxCount: 1 },
  ]),
  createProduct
);

// ✅ Update product (support image + brochure) ← ✅ Yeh part add kiya gaya
router.put(
  '/:id',
  protect,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'brochure', maxCount: 1 },
  ]),
  updateProduct
);

// ✅ Delete product
router.delete('/:id', protect, deleteProduct);

export default router;
