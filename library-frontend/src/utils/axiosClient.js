// src/utils/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Gửi token trong mỗi request nếu có
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
