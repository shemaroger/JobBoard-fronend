// src/services/jobCategoryService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';  // Replace with your actual backend URL

// Get all categories
export const getAllCategories = () => {
  return axios.get(`${API_URL}/all`); // Make sure this endpoint is correct
};
