import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// fetch categories
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
// search categories && have toast
export const searchCategoriesThunk = createAsyncThunk(
  "categories/search",
  async ({ search, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(
        `/category/search?text=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// create category && have toast
export const createCategoryThunk = createAsyncThunk("categories/create", async (data, thunkAPI) => {
  const toastId = toastService.loading("جاري إضافة الفئة...");
  try {
    await api.post(`/category`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toastService.success(toastId, "تم إضافة الفئة بنجاح");
  } catch (err) {
    toastService.error(toastId, "فشل إضافة الفئة");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// update category && have toast
export const updateCategoryThunk = createAsyncThunk(
  "categories/update",
  async ({ id, data }, thunkAPI) => {
    const toastId = toastService.loading("جاري تحديث الفئة...");
    try {
      const res = await api.patch(`/category/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastService.success(toastId, "تم تحديث الفئة بنجاح");
      return res.data.data;
    } catch (err) {
      toastService.error(toastId, "فشل تحديث الفئة");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// delete category && have toast
export const deleteCategoryThunk = createAsyncThunk("categories/delete", async (id, thunkAPI) => {
  const toastId = toastService.loading("جاري حذف الفئة...");
  try {
    await api.delete(`/category/delete/${id}`);
    toastService.success(toastId, "تم حذف الفئة بنجاح");
    return id;
  } catch (err) {
    toastService.error(toastId, "فشل حذف الفئة");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
