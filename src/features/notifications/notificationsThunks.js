import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

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
