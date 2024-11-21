import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5227/api",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers["Include-Authorization"]) {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      delete config.headers["Include-Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default AxiosInstance;
