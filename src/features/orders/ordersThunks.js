import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { toastService } from "@/utils/toastService";

// fetch orders
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
// search orders && have toast
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
// get order by id
export const getOrderByIdThunk = createAsyncThunk("orders/getById", async (orderId, thunkAPI) => {
  try {
    const res = await api.get(`/orders/${orderId}/order`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
// add item to order && have toast
export const addItemToOrderThunk = createAsyncThunk(
  "orders/addItem",
  async ({ orderId, data }, thunkAPI) => {
    const toastId = toastService.loading("جاري إضافة المنتج...");
    try {
      const res = await api.post(`/orders/${orderId}/add-item`, data); // data as array of object with product id & quan
      toastService.success(toastId, "تم إضافة المنتج بنجاح");
      return res.data.items;
    } catch (err) {
      toastService.error(toastId, "فشل إضافة المنتج");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// update order status && have toast
export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, data }, thunkAPI) => {
    const toastId = toastService.loading("جاري تحديث حالة الطلب...");
    try {
      const res = await api.patch(`/orders/${id}/orderStatus`, data);
      toastService.success(toastId, "تم تحديث حالة الطلب بنجاح");
      return res.data.data;
    } catch (err) {
      toastService.error(toastId, "فشل تحديث حالة الطلب");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// update order item && have toast
export const updateOrderItemThunk = createAsyncThunk(
  "orders/updateItem",
  async ({ itemId, data }, thunkAPI) => {
    const toastId = toastService.loading("جاري تحديث المنتج...");
    try {
      const res = await api.patch(`/orders/${itemId}/orderItem`, data);
      toastService.success(toastId, "تم تحديث المنتج بنجاح");
      return res.data.data;
    } catch (err) {
      toastService.error(toastId, "فشل تحديث المنتج");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// delete order item && have toast
export const deleteOrderItemThunk = createAsyncThunk(
  "orders/deleteItem",
  async (itemId, thunkAPI) => {
    const toastId = toastService.loading("جاري حذف المنتج...");
    try {
      await api.delete(`/orders/${itemId}/orderItem`);
      toastService.success(toastId, "تم حذف المنتج بنجاح");
      return itemId;
    } catch (err) {
      toastService.error(toastId, "فشل حذف المنتج");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
// delete order && have toast
export const deleteOrderThunk = createAsyncThunk("orders/delete", async (orderId, thunkAPI) => {
  const toastId = toastService.loading("جاري حذف الطلب...");
  try {
    await api.delete(`/orders/${orderId}/order`);
    toastService.success(toastId, "تم حذف الطلب بنجاح");
    return orderId;
  } catch (err) {
    toastService.error(toastId, "فشل حذف الطلب");
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
