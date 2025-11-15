import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const loginAdmin = createAsyncThunk(
  "auth/login/admin",
  async ({ phone, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/auth/login/admin`, {
        phone: "2" + phone,
        password,
      });

      // Save tokens
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);

      // Immediately fetch profile after login success
      await dispatch(getAdminProfile());

      return data; // { accessToken, refreshToken }
    } catch (err) {
      return rejectWithValue("الهاتف او كلمه المرور غير صحيح");
    }
  }
);
export const getAdminProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (!access_token || !refresh_token) {
      localStorage.clear();
      window.location.href = "/";
      return rejectWithValue("Missing token");
    }

    try {
      const { data } = await api.get(`/admin/profile`);
      return data.data;
    } catch (err) {
      localStorage.clear();
      window.location.href = "/";
      return rejectWithValue("Session expired");
    }
  }
);
export const updateMyProfileThunk = createAsyncThunk(
  "admin/editProfile",
  async (data, thunkAPI) => {
    try {
      await api.patch(`/admin/editProfile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      await thunkAPI.dispatch(getAdminProfile());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const logoutAdmin = createAsyncThunk("auth/logout/admin", async (_, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || !refresh_token) {
    localStorage.clear();
    window.location.href = "/";
    return rejectWithValue("Missing tokens");
  }

  try {
    await api.post(`/auth/logout/admin`);

    // clear all data on success
    localStorage.clear();
    window.location.href = "/";
    return true;
  } catch (err) {
    localStorage.clear();
    window.location.href = "/";
    return rejectWithValue(err.response?.data || "Logout failed");
  }
});
