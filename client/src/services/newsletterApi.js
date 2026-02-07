// src/services/newsletterApi.js
import axios from 'axios';

const API = axios.create({  baseURL: `${import.meta.env.VITE_API_URL}/api`});

export const subscribeNewsletter = (email) =>
  API.post('/newsletter/subscribe', { email });
