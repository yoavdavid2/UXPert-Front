import axios from "axios";
import { BACKEND_URL, TOKEN_LS } from "../config";

// Create an Axios instance
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// Request Interceptor: Adds Token from Local Storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_LS);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Unauthorized Access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_LS);
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;