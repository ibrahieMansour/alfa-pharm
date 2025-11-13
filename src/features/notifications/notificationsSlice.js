import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  updateNotificationStatus,
  updateAllNotificationsStatus,
  deleteNotification,
  deleteAllNotifications,
} from "./notificationsThunks";

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        if (state.notifications.length > 0) {
          state.loading = true;
        };
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch notifications";
      })
      // Update single notification viewed status
      .addCase(updateNotificationStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.error = action.payload || action.error?.message || "Failed to update notification";
      })
      // Update all notifications viewed status
      .addCase(updateAllNotificationsStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateAllNotificationsStatus.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(updateAllNotificationsStatus.rejected, (state, action) => {
        state.error = action.payload || action.error?.message || "Failed to update all notifications";
      })
      // Delete single notification
      .addCase(deleteNotification.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload || action.error?.message || "Failed to delete notification";
      })
      // Delete all notifications
      .addCase(deleteAllNotifications.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(deleteAllNotifications.rejected, (state, action) => {
        state.error = action.payload || action.error?.message || "Failed to delete all notifications";
      });
  },
});

export default notificationsSlice.reducer;

// Selectors
export const selectUnreadNotificationsCount = (state) =>
  state.notifications.notifications?.reduce((acc, n) => acc + (n?.isView ? 0 : 1), 0) || 0;
