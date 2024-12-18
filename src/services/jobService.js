import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs"; // Adjust your backend URL as needed

// Create a new job
export const addJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/add`, jobData);
  return response.data;
};

// Get a job by ID
export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Get all jobs
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Get jobs by category
export const getJobsByCategory = async (categoryId) => {
  const response = await axios.get(`${API_URL}/category/${categoryId}`);
  return response.data;
};

// Get jobs by employer
export const getJobsByEmployer = async (employerId) => {
  const response = await axios.get(`${API_URL}/employer/${employerId}`);
  return response.data;
};

// Get jobs by location
export const getJobsByLocation = async (location) => {
  const response = await axios.get(`${API_URL}/location`, {
    params: { location },
  });
  return response.data;
};

// Search jobs
export const searchJobs = async (keyword) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { keyword },
  });
  return response.data;
};

// Update a job
export const updateJob = async (id, jobData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, jobData);
  return response.data;
};

// Delete a job
export const deleteJob = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};
