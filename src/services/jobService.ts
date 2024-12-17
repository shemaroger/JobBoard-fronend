import axios from 'axios';

const API_URL = "http://localhost:8080/api/jobs"; // Replace with your backend URL

const JobService = {
  getAllJobs: () => axios.get(`${API_URL}/all`),
  getJobById: (id) => axios.get(`${API_URL}/${id}`),
  createJob: (job) => axios.post(`${API_URL}/add`, job),
  updateJob: (id, jobDetails) => axios.put(`${API_URL}/update/${id}`, jobDetails),
  deleteJob: (id) => axios.delete(`${API_URL}/delete/${id}`),
  getJobsByCategory: (categoryId) => axios.get(`${API_URL}/category/${categoryId}`),
  getJobsByEmployer: (employerId) => axios.get(`${API_URL}/employer/${employerId}`),
  getJobsByLocation: (location) => axios.get(`${API_URL}/location`, { params: { location } }),
  searchJobs: (keyword) => axios.get(`${API_URL}/search`, { params: { keyword } }),
};

export default JobService;
