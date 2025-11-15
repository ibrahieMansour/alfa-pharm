import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  searchUsersThunk,
  getUserByIdThunk,
  createUserThunk,
  updateUserThunk,
  deleteUserThunk,
} from "./usersThunks";

const initialState = {
  users: [],
  meta: {},
  currentUser: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ List users
      .addCase(fetchUsers.pending, (state) => {
        if (!state.users.length) {
          state.loading = true;
        }
        state.currentUser = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        const { data, meta } = payload;
        state.loading = false;
        state.users = data;
        state.meta = meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔍 Search users
      .addCase(searchUsersThunk.fulfilled, (state, { payload }) => {
        const { data, meta } = payload;
        state.users = data;
        state.meta = meta;
      })

      // 👤 Get user by ID
      .addCase(getUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.currentUser = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data || action.payload;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
