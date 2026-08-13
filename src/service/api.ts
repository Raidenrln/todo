import axios from "axios";

const todoAPI = axios.create({
  baseURL: "http://localhost:3000",
});

todoAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default todoAPI;