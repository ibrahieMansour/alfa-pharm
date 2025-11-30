import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(`/users/list?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// search users && have toast
export const searchUsersThunk = createAsyncThunk(
  "users/search",
  async ({ search, searchPhone, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(
        `/users/search?search=${search}&searchPhone=${searchPhone}&page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// get user by id
export const getUserByIdThunk = createAsyncThunk("users/getById/view", async (id, thunkAPI) => {
  try {
    const res = await api.get(`/users/${id}/view`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// create user && have toast
export const createUserThunk = createAsyncThunk("users/create", async (data, thunkAPI) => {
  const toastId = toastService.loading("جاري إضافة المستخدم...");
  try {
    const res = await api.post(`/users/create`, data);
    toastService.success(toastId, "تم إضافة المستخدم بنجاح");
    return res.data.data;
  } catch (err) {
    toastService.error(toastId, "فشل إضافة المستخدم");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// update user && have toast
export const updateUserThunk = createAsyncThunk("users/update", async ({ id, data }, thunkAPI) => {
  const toastId = toastService.loading("جاري تحديث المستخدم...");
  try {
    const res = await api.put(`/users/${id}/edit`, data);
    toastService.success(toastId, "تم تحديث المستخدم بنجاح");
    return res.data.data;
  } catch (err) {
    toastService.error(toastId, "فشل تحديث المستخدم");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// delete user && have toast
export const deleteUserThunk = createAsyncThunk("users/delete", async (id, thunkAPI) => {
  const toastId = toastService.loading("جاري حذف المستخدم...");
  try {
    await api.delete(`/users/${id}/delete`);
    toastService.success(toastId, "تم حذف المستخدم بنجاح");
    return id;
  } catch (err) {
    toastService.error(toastId, "فشل حذف المستخدم");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
