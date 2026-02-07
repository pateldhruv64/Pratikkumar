// src/services/authApi.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const loginAdmin = (credentials) => API.post('/auth/login', credentials);
