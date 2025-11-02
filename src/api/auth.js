import axios from "axios";
import { BASE_URL } from "./config";

export const login = (email, password) => {
  return axios.post(`${BASE_URL}/auth/login/admin`, { email, password }).then((res) => {
    const { accessToken, refreshToken, admin } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("admin", JSON.stringify(admin));
    return admin;
  });
};

export const logout = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .post(
      `${BASE_URL}/auth/logout/admin`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .finally(() => {
      localStorage.clear();
      window.location.href = "/signin";
    });
};
