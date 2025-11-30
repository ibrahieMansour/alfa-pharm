import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// fetch products
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
// search products && have toast
export const searchProductsThunk = createAsyncThunk(
  "products/search",
  async ({ search, categoryId, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const params = { page, limit };

      if (search) params.search = search;
      if (categoryId) params.categoryId = categoryId;

      const query = new URLSearchParams(params).toString();

      const res = await api.get(`/products/searchforadmin?${query}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// create product && have toast
export const createProductThunk = createAsyncThunk("products/create", async (data, thunkAPI) => {
  const toastId = toastService.loading("جاري إضافة المنتج...");
  try {
    await api.post(`/products/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toastService.success(toastId, "تم إضافة المنتج بنجاح");
  } catch (err) {
    toastService.error(toastId, "فشل إضافة المنتج");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// update product && have toast
export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, data }, thunkAPI) => {
    const toastId = toastService.loading("جاري تحديث المنتج...");
    try {
      const res = await api.patch(`/products/${id}/editProduct`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastService.success(toastId, "تم تحديث المنتج بنجاح");
      return res.data.data;
    } catch (err) {
      toastService.error(toastId, "فشل تحديث المنتج");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// delete product && have toast
export const deleteProductThunk = createAsyncThunk("products/delete", async (id, thunkAPI) => {
  const toastId = toastService.loading("جاري حذف المنتج...");
  try {
    await api.delete(`/products/${id}/deleteProduct`);
    toastService.success(toastId, "تم حذف المنتج بنجاح");

  } catch (err) {
    toastService.error(toastId, "فشل حذف المنتج");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
