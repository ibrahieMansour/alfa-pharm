import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const fetchAdmins = createAsyncThunk("admins/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get(`/admin`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const createAdminThunk = createAsyncThunk("admin/create", async (data, thunkAPI) => {
  try {
    const res = await api.post(`/admin`, data);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const updateAdminThunk = createAsyncThunk("admin/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.patch(`/admin/${id}/edit`, data);
    return res.data.admin;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const deleteAdminThunk = createAsyncThunk("admin/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`/admin/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
