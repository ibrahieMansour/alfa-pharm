// src/redux/slices/staffSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  searchProductsThunk,
  // getProductByIdThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "./productsThunks";

const initialState = {
  products: [],
  meta: {},
  // currentproduct: {},
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ List products
      .addCase(fetchProducts.pending, (state) => {
        if (!state.products.length) {
          state.loading = true;
        }
        state.error = null;
        // state.currentproduct = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        const { data, meta } = payload;
        state.loading = false;
        state.products = data;
        state.meta = meta;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔍 Search products
      .addCase(searchProductsThunk.fulfilled, (state, {payload}) => {
        const { data, meta } = payload;
        state.products = data;
        state.meta = meta;
      })

      // 👤 Get product by ID
      // .addCase(getProductByIdThunk.pending, (state) => {
      //   state.loading = true;
      //   state.currentAdmin = null;
      // })
      // .addCase(getProductByIdThunk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.currentAdmin = action.payload.data || action.payload;
      // })

      // ✏️ Update product
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export default productsSlice.reducer;
