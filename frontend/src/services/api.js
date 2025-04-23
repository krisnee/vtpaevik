import axios from 'axios';

// Baas URL meie API jaoks - CRA kasutab process.env muutujaid
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Axios instance konfiguratsiooni ja interceptoritega
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lisame token igale päringule
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Käsitleme 401 vead (aegunud token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;