// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllLocations = async () => {
  const response = await api.get('/api/locations');
  return response.data;
};

export const getShortestPath = async (from, to) => {
  const response = await api.get(`/api/path?from=${from}&to=${to}`);
  return response.data;
};

export default api;