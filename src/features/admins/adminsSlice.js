// src/redux/slices/staffSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAdmins,
  // getAdminByIdThunk,
  createAdminThunk,
  updateAdminThunk,
  deleteAdminThunk,
} from "./adminsThunks";

const initialState = {
  admins: [],
  // currentAdmin: {},
  loading: false,
  error: null,
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ List admins
      .addCase(fetchAdmins.pending, (state) => {
        if (!state.admins.length) {
          state.loading = true;
        }
        // state.currentAdmin = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 👤 Get admin by ID
      // .addCase(getAdminByIdThunk.pending, (state) => {
      //   state.loading = true;
      //   state.currentAdmin = null;
      // })
      // .addCase(getAdminByIdThunk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.currentAdmin = action.payload.data || action.payload;
      // })

      // ➕ Create admin
      .addCase(createAdminThunk.fulfilled, (state, action) => {
        state.admins.unshift(action.payload);
      })

      // ✏️ Update admin
      .addCase(updateAdminThunk.fulfilled, (state, action) => {
        const index = state.admins.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })

      // 🗑️ Delete admin
      .addCase(deleteAdminThunk.fulfilled, (state, action) => {
        state.admins = state.admins.filter((u) => u.id !== action.payload);
      });
  },
});

export default adminsSlice.reducer;
