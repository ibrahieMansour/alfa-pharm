import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// login admin && have toast
export const loginAdmin = createAsyncThunk(
  "auth/login/admin",
  async ({ phone, password }, { dispatch, rejectWithValue }) => {
    const toastId = toastService.loading("جاري تسجيل الدخول...");
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
      
      toastService.success(toastId, "تم تسجيل الدخول بنجاح");
      return data; // { accessToken, refreshToken }
    } catch (err) {
      toastService.error(toastId, "فشل تسجيل الدخول");
      return rejectWithValue("الهاتف او كلمه المرور غير صحيح");
    }
  }
);
// get admin profile
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
// update my profile && have toast
export const updateMyProfileThunk = createAsyncThunk(
  "admin/editProfile",
  async (data, thunkAPI) => {
    const toastId = toastService.loading("جاري تحديث الملف الشخصي...");
    try {
      await api.patch(`/admin/editProfile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      await thunkAPI.dispatch(getAdminProfile());
      toastService.success(toastId, "تم تحديث الملف الشخصي بنجاح");
    } catch (err) {
      toastService.error(toastId, "فشل تحديث الملف الشخصي");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// logout admin && have toast
export const logoutAdmin = createAsyncThunk("auth/logout/admin", async (_, { rejectWithValue }) => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || !refresh_token) {
    localStorage.clear();
    window.location.href = "/";
    return rejectWithValue("Missing tokens");
  }

  const toastId = toastService.loading("جاري تسجيل الخروج...");
  try {
    await api.post(`/auth/logout/admin`);

    // clear all data on success
    localStorage.clear();
    window.location.href = "/";
    toastService.success(toastId, "تم تسجيل الخروج بنجاح");
    return true;
  } catch (err) {
    toastService.success(toastId, "تم تسجيل الخروج بنجاح");
    localStorage.clear();
    window.location.href = "/";
    return rejectWithValue(err.response?.data || "Logout failed");
  }
});
