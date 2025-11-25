import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/ordersSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/products/productsSlice";
import usersReducer from "../features/users/usersSlice";
import adminsReducer from "../features/admins/adminsSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    categories:categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    admins: adminsReducer,
    notifications: notificationsReducer,
  },
});

export default store;
