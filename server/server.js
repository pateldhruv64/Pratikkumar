import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Restrictive but allows Cloudinary
  contentSecurityPolicy: false, // Disabling CSP for now to avoid breaking styles/images, but setting other headers
}));
app.use(compression()); // ✅ Enable Gzip compression
app.use(cors());
app.use(express.json()); // Parse JSON

// ✅ Serve uploaded images statically with caching
const __dirname = path.resolve();
app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {
  maxAge: '1d', // Cache for 1 day
  etag: true
}));
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
// Default route
app.get('/', (req, res) => {
  res.send('Pharma Backend is Running...');
});

// Error handler middleware
app.use(notFound);
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.stack);
  errorHandler(err, req, res, next);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
