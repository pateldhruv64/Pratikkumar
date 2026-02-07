// src/services/productApi.js
import axios from 'axios';

const API = axios.create({  baseURL: `${import.meta.env.VITE_API_URL}/api` });

export const getAllProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData, token) =>
  API.post('/products', productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateProduct = (id, productData, token) =>
  API.put(`/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteProduct = (id, token) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
