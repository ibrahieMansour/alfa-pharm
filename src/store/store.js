import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

// import orderReducer from "../features/orderSlice";
// import productReducer from "../features/productSlice";
import usersSlice from "../features/users/usersSlice";
// import staffReducer from "../features/staffSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // orders: orderReducer,
    // products: productReducer,
    users: usersSlice,
    // staff: staffReducer,
  },
});

export default store;
