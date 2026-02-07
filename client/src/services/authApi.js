// // src/services/authApi.js
// import axios from 'axios';

// const API = axios.create({ baseURL: 'import.meta.env.VITE_API_URL,/api' });

// export const loginAdmin = (credentials) => API.post('/auth/login', credentials);

import axios from 'axios';

// Correct way to use Vite environment variable
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const loginAdmin = (credentials) => 
  API.post('/auth/login', credentials);
