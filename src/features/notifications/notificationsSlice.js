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
  unreadNotificationsCount: 0,
  loading: false,
  error: null,
  hasNewUnread: false, // NEW
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

        const oldCount = state.unreadNotificationsCount; // previous
        const newCount = action.payload.filter((n) => !n.isView).length; // new

        state.notifications = action.payload;
        state.unreadNotificationsCount = newCount;

        // detect NEW unread notifications
        state.hasNewUnread = newCount > oldCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch notifications";
      })
      // Update single notification viewed status
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadNotificationsCount = action.payload.filter((n) => !n.isView).length;
      })
      // Update all notifications viewed status
      .addCase(updateAllNotificationsStatus.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadNotificationsCount = action.payload.filter((n) => !n.isView).length;
      })
      // Delete single notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadNotificationsCount = action.payload.filter((n) => !n.isView).length;
      })
      // Delete all notifications
      .addCase(deleteAllNotifications.fulfilled, (state, action) => {
        state.notifications = [];
        state.unreadNotificationsCount = 0;
      })
  },
});

export default notificationsSlice.reducer;