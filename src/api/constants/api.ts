import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token simples, sem JSON.stringify

  if (token) {
    config.headers = config.headers || {}; // garante que headers exista
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
