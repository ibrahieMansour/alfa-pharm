import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrders,
  searchOrdersThunk,
  getOrderByIdThunk,
  addItemToOrderThunk,
  updateOrderStatusThunk,
  updateOrderItemThunk,
  deleteOrderItemThunk,
  deleteOrderThunk,
} from "./ordersThunks";

const initialState = {
  orders: [],
  meta: {},
  currentOrder: {},
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all orders
      .addCase(fetchOrders.pending, (state) => {
        if (!state.orders.length) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
        state.meta = action.payload.meta || {};
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchOrdersThunk.fulfilled, (state, { payload }) => {
        const { data, meta } = payload;
        state.orders = data;
        state.meta = meta;
      })

      // ✅ Get single order
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // .addCase(addItemToOrderThunk.fulfilled, (state, action) => {
      //   if (state.currentOrder?.items) {
      //     state.currentOrder.items.push(...action.payload);
      //   }
      // })

      // ✅ Update order status
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        if (state.orders?.length) {
          const index = state.orders.findIndex((o) => o.id === action.payload.id);
          if (index !== -1) {
            state.orders[index].status = action.payload.status;
          }
        }

        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder.status = action.payload.status;
        }
      })

      // ✅ Update order item
      .addCase(updateOrderItemThunk.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        if (state.currentOrder?.items) {
          const index = state.currentOrder.items.findIndex((i) => i.id === updatedItem.id);
          if (index !== -1) state.currentOrder.items[index] = updatedItem;

          // Recalculate total price based on remaining items
          state.currentOrder.totalAmount = state.currentOrder.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      })

      // ✅ Delete order item
      .addCase(deleteOrderItemThunk.fulfilled, (state, action) => {
        const deletedId = action.payload;
        if (state.currentOrder?.items) {
          state.currentOrder.items = state.currentOrder.items.filter((i) => i.id !== deletedId);

          // Recalculate total price based on remaining items
          state.currentOrder.totalAmount = state.currentOrder.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      });
  },
});

export default ordersSlice.reducer;
