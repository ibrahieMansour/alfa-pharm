import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/api/config";

// 🔹 LOGIN THUNK
export const loginAdmin = createAsyncThunk(
  "auth/login/admin",
  async ({ phone, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login/admin`, {
        // phone: "2" + phone,
        // password,
        phone: "201555352412",
        password: "P@ssw0rd",
      });

      // ✅ Save tokens
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);

      // ✅ Immediately fetch profile after login success
      // await dispatch(getAdminProfile());

      return data; // { accessToken, refreshToken }
    } catch (err) {
      return rejectWithValue("الهاتف او كلمه المرور غير صحيح");
    }
  }
);

// 🔹 GETPROFILE THUNK (requires token)
export const getAdminProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      localStorage.clear();
      window.location.href = "/";
      return rejectWithValue("Missing token");
    }
    console.log(access_token)
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return data; // { data: { name, phone, ... } }
    } catch (err) {
      localStorage.clear();
      window.location.href = "/";
      return rejectWithValue("Session expired");
    }
  }
);

// 🔹 LOGOUT THUNK (requires token)
export const logoutAdmin = createAsyncThunk("auth/logout/admin", async (_, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    localStorage.clear();
    window.location.href = "/";
    return rejectWithValue("Missing tokens");
  }

  try {
    await axios.post(
      `${BASE_URL}/auth/logout/admin`,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    // ✅ clear all data on success
    localStorage.clear();
    window.location.href = "/";
    return true;
  } catch (err) {
    localStorage.clear();
    window.location.href = "/";
    return rejectWithValue(err.response?.data || "Logout failed");
  }
});
