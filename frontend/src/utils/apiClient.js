import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL
    : "/api/auth";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // if you need to send cookies with requests
});

export default apiClient;
