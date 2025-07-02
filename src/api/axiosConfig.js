import axios from 'axios';
import { BASE_URL, API_PREFIX } from '../config/api';

const apiClient = axios.create({
  baseURL: `${BASE_URL}${API_PREFIX}`, // hasil: http://localhost:5000/api
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
