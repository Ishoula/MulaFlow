import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const BASE_URL = process.env.BASE_URL 

const api = axios.create({
  baseURL: "https://mulaflow-backend.onrender.com/api",
});

// 🔐 INTERCEPTOR (AUTO ATTACH TOKEN)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isAuthRequest = config.url?.startsWith("/auth/");

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.startsWith("/auth/");
    const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

    if (isUnauthorized && !isAuthRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
