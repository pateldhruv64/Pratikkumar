// server/routes/adminRoutes.js
import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getDashboardData,
  uploadCatalogPdf,
  getSettings, // ✅ New
} from '../controllers/adminController.js';

import protect from '../middleware/protect.js';
import { catalogUpload } from '../middleware/upload.js'; // ✅ Use Cloudinary for catalog
import upload from '../middleware/upload.js';

const router = express.Router();

// 🔓 Public Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/settings', getSettings); // ✅ Publicly get catalog URL

// 🔐 Protected Route
router.get('/dashboard', protect, getDashboardData);

// ✅ Upload Catalog PDF (Admin only - Cloudinary storage)
router.post(
  '/upload-catalog',
  protect,
  catalogUpload.single('catalog'),
  uploadCatalogPdf
);

// ✅ NOTE: Product add/edit/delete routes should go in productRoutes.js, not here

export default router;
