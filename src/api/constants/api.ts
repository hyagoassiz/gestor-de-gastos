import axios from "axios";
import { showSnackBar } from "@/redux/snackBarSlice";
import { store } from "@/redux/store";

export const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Erro inesperado";
    store.dispatch(showSnackBar({ message, type: "error" }));
    return Promise.reject(error);
  }
);
