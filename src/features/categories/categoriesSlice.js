// src/redux/slices/staffSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  searchCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "./categoriesThunks";

const initialState = {
  categories: [],
  meta: {},
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ List categories
      .addCase(fetchCategories.pending, (state) => {
        if (!state.categories.length) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        const { data, meta } = payload;
        state.loading = false;
        state.categories = data;
        state.meta = meta;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔍 Search categories
      .addCase(searchCategoriesThunk.fulfilled, (state, {payload}) => {
        const { data, meta } = payload;
        state.categories = data;
        state.meta = meta;
      })

      // ✏️ Update category
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        const index = state.categories.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

export default categoriesSlice.reducer;
