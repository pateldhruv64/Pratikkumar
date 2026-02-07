import express from 'express';
import cors from 'cors';
import path from 'path'; // ✅ Needed for static path
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
app.use(cors());
app.use(express.json()); // Parse JSON

// ✅ Serve uploaded images statically
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
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
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
