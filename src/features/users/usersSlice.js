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
        state.loading = true;
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
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.data || action.payload;
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

      // ➕ Create user
      .addCase(createUserThunk.fulfilled, (state, action) => {
        if (state.users.length === 10) {
          state.users.unshift(action.payload);
          state.users.pop();
        }
      })

      // ✏️ Update user
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        const { id, suspend } = payload;

        const user = state.users?.find((u) => u.id === id);
        if (user) user.suspend = suspend;

        if (state.currentUser?.id === id) {
          state.currentUser.suspend = suspend;
        }
      })

      // 🗑️ Delete user
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
