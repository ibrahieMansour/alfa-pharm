import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

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
export const searchUsersThunk = createAsyncThunk(
  "users/search",
  async ({ search, searchPhone }, thunkAPI) => {
    try {
      const res = await api.get(`/users/search?search=${search}&searchPhone=${searchPhone}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const getUserByIdThunk = createAsyncThunk("users/getById/view", async (id, thunkAPI) => {
  try {
    const res = await api.get(`/users/${id}/view`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const createUserThunk = createAsyncThunk("users/create", async (data, thunkAPI) => {
  try {
    const res = await api.post(`/users/create`, data);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const updateUserThunk = createAsyncThunk("users/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/users/${id}/edit`, data);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const deleteUserThunk = createAsyncThunk("users/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`/users/${id}/delete`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
