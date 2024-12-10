import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Adjust the base URL to match your backend
});

export default api;
