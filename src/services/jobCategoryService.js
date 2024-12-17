// src/services/jobCategoryService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';  // Replace with your actual backend URL

// Create a category
export const createCategory = (category) => {
  return axios.post(`${API_URL}/add`, category);
};

// Get all categories
export const getAllCategories = () => {
  return axios.get(`${API_URL}/all`);
};

// Get category by ID
export const getCategoryById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Get category by name
export const getCategoryByName = (name) => {
  return axios.get(`${API_URL}/name/${name}`);
};

// Update category
export const updateCategory = (id, category) => {
  return axios.put(`${API_URL}/update/${id}`, category);
};

// Delete category
export const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};
