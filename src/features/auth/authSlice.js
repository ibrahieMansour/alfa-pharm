import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, logoutAdmin } from "./authThunks";

const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const { admin, accessToken, refreshToken } = action.payload;
        state.admin = admin;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.status = "succeeded";
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.clear();
      });
  },
});

export default authSlice.reducer;
