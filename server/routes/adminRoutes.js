// server/routes/adminRoutes.js
import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getDashboardData,
  uploadCatalogPdf, // ✅ New controller
} from '../controllers/adminController.js';

import protect from '../middleware/protect.js';
import upload from '../middleware/upload.js'; // ✅ For handling PDF upload

const router = express.Router();

// 🔓 Public Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// 🔐 Protected Route
router.get('/dashboard', protect, getDashboardData);

// ✅ Upload Catalog PDF (Admin only)
router.post(
  '/upload-catalog',
  protect,
  upload.single('catalog'),
  uploadCatalogPdf
);

// ✅ NOTE: Product add/edit/delete routes should go in productRoutes.js, not here

export default router;
