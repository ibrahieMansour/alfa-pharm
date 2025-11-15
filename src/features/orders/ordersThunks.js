import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await api.get(`/orders/list?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// export const searchOrdersThunk = createAsyncThunk(
//   "orders/search",
//   async ({ status, orderNumber, userPhone, userName, page = 1, limit = 10 } = {}, thunkAPI) => {
//     try {
//       const res = await api.get(`/orders/searchOrder?status=${status}&page=${page}&limit=${limit}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );
export const searchOrdersThunk = createAsyncThunk(
  "orders/search",
  async ({ status, orderNumber, userPhone, userName, page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const params = { page, limit };

      if (status) params.status = status;
      if (orderNumber) params.orderNumber = orderNumber;
      if (userPhone) params.userPhone = userPhone;
      if (userName) params.userName = userName;

      const query = new URLSearchParams(params).toString();

      const res = await api.get(`/orders/searchOrder?${query}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const getOrderByIdThunk = createAsyncThunk("orders/getById", async (orderId, thunkAPI) => {
  try {
    const res = await api.get(`/orders/${orderId}/order`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
export const addItemToOrderThunk = createAsyncThunk(
  "orders/addItem",
  async ({ orderId, data }, thunkAPI) => {
    try {
      const res = await api.post(`/orders/${orderId}/add-item`, data); // data as array of object with product id & quan
      return res.data.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.patch(`/orders/${id}/orderStatus`, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateOrderItemThunk = createAsyncThunk(
  "orders/updateItem",
  async ({ itemId, data }, thunkAPI) => {
    try {
      const res = await api.patch(`/orders/${itemId}/orderItem`, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const deleteOrderItemThunk = createAsyncThunk(
  "orders/deleteItem",
  async (itemId, thunkAPI) => {
    try {
      await api.delete(`/orders/${itemId}/orderItem`);
      return itemId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const deleteOrderThunk = createAsyncThunk("orders/delete", async (orderId, thunkAPI) => {
  try {
    await api.delete(`/orders/${orderId}/order`);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
