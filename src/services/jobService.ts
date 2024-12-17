import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs"; // Replace with your backend URL

export const jobService = {
  getAllJobs: async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  },

  getJobById: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createJob: async (job: any) => {
    const response = await axios.post(`${API_URL}/add`, job);
    return response.data;
  },

  updateJob: async (id: number, job: any) => {
    const response = await axios.put(`${API_URL}/update/${id}`, job);
    return response.data;
  },

  deleteJob: async (id: number) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  },
};
