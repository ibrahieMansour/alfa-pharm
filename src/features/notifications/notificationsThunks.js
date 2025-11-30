import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/notifications`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// update notification status
export const updateNotificationStatus = createAsyncThunk(
  "notifications/updateStatus",
  async (id, thunkAPI) => {
    try {
      const res = await api.patch(`/notifications/${id}`, { isView: true });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// update all notifications status
export const updateAllNotificationsStatus = createAsyncThunk(
  "notifications/updateAllStatus",
  async (_, thunkAPI) => {
    try {
      const res = await api.post(`/notifications/mark-all-as-read`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// delete notification
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/notifications/${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// delete all notifications
export const deleteAllNotifications = createAsyncThunk(
  "notifications/deleteAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.delete(`/notifications`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
