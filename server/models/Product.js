// server/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    pdf: String,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
