// src/redux/slices/customersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [], // {id, name, phone, email, blocked, totalOrders}
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
    blockCustomer: (state, action) => {
      const customer = state.customers.find(c => c.id === action.payload);
      if (customer) customer.blocked = true;
    },
    unBlockCustomer: (state, action) => {
      const customer = state.customers.find(c => c.id === action.payload);
      if (customer) customer.blocked = false;
    },
  },
});

export const { setCustomers, addCustomer, updateCustomer, deleteCustomer, blockCustomer } = customersSlice.actions;
export default customersSlice.reducer;
