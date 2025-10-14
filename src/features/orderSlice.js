// src/redux/slices/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],   // {id, status, items, customer, note}
  loading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // new order at top
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
