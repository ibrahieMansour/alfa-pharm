import axios from "axios";
import { BASE_URL } from "./config";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/signin";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh/admin`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const newAccess = data.accessToken;
        localStorage.setItem("accessToken", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/signin";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
