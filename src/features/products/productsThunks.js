import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(`/products/find-all-for-admin?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const searchProductsThunk = createAsyncThunk(
  "products/search",
  async ({ search, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(
        `/products/search-admin?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createProductThunk = createAsyncThunk("products/create", async (data, thunkAPI) => {
  try {
    await api.post(`/products/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.patch(`/products/${id}/editProduct`, data, {
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
export const deleteProductThunk = createAsyncThunk("products/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`/products/${id}/deleteProduct`);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
