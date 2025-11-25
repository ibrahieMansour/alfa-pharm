import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(`/category/findall-admin?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const searchCategoriesThunk = createAsyncThunk(
  "categories/search",
  async ({ search, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(
        `/category/search?text=${search}&page=${page}&limit=${limit}`
      );
      console.log(res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createCategoryThunk = createAsyncThunk("categories/create", async (data, thunkAPI) => {
  try {
    await api.post(`/category`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const updateCategoryThunk = createAsyncThunk(
  "categories/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.patch(`/category/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const deleteCategoryThunk = createAsyncThunk("categories/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`/category/delete/${id}`);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
