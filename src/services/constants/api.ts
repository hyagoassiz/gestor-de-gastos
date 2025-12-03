import axios from "axios";
import { showSnackBar } from "@/redux/snackBarSlice";
import { store } from "@/redux/store";
import { AUTENTICACAO } from "@/routes/paths";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.error || "Erro inesperado";

    store.dispatch(showSnackBar({ message, type: "error" }));

    if (status === 401) {
      window.location.href = AUTENTICACAO.LOGIN;
    }

    return Promise.reject(error);
  }
);
