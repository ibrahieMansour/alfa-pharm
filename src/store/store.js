import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orderSlice";
import productReducer from "../features/productSlice";
import customerReducer from "../features/customerSlice";
import staffReducer from "../features/staffSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    products: productReducer,
    customers: customerReducer,
    staff: staffReducer,
  },
});

export default store;
