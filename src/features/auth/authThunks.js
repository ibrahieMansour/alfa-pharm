import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/api/config";

// Login thunk
export const loginAdmin = createAsyncThunk("auth/loginAdmin", async ({ email, password }) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login/admin`, {
    email,
    password,
  });
  return {
    admin: data.admin,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
});

// Logout thunk
export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  const token = localStorage.getItem("accessToken");
  await axios.post(
    `${BASE_URL}/auth/logout/admin`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  localStorage.clear();
  window.location.href = "/signin";
});
