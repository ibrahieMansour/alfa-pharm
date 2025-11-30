import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// fetch admins
export const fetchAdmins = createAsyncThunk("admins/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get(`/admin`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// create admin && have toast
export const createAdminThunk = createAsyncThunk("admin/create", async (data, thunkAPI) => {
  const toastId = toastService.loading("جاري إضافة المسؤول...");
  try {
    const res = await api.post(`/admin`, data);
    toastService.success(toastId, "تم إضافة المسؤول بنجاح");
    return res.data.data;
  } catch (err) {
    toastService.error(toastId, "فشل إضافة المسؤول");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// update admin && have toast
export const updateAdminThunk = createAsyncThunk("admin/update", async ({ id, data }, thunkAPI) => {
  const toastId = toastService.loading("جاري تحديث المسؤول...");
  try {
    const res = await api.patch(`/admin/${id}/edit`, data);
    toastService.success(toastId, "تم تحديث المسؤول بنجاح");
    return res.data.admin;
  } catch (err) {
    toastService.error(toastId, "فشل تحديث المسؤول");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// delete admin && have toast
export const deleteAdminThunk = createAsyncThunk("admin/delete", async (id, thunkAPI) => {
  const toastId = toastService.loading("جاري حذف المسؤول...");
  try {
    await api.delete(`/admin/${id}`);
    toastService.success(toastId, "تم حذف المسؤول بنجاح");
    return id;
  } catch (err) {
    toastService.error(toastId, "فشل حذف المسؤول");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
