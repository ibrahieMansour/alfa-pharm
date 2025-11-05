// src/redux/slices/staffSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: [], // {id, name, email, role: "staff", phone, active}
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    addStaff: (state, action) => {
      state.staff.push(action.payload);
    },
    updateStaff: (state, action) => {
      const index = state.staff.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.staff[index] = action.payload;
      }
    },
    deleteStaff: (state, action) => {
      state.staff = state.staff.filter(s => s.id !== action.payload);
    },
    deactivateStaff: (state, action) => {
      const staffMember = state.staff.find(s => s.id === action.payload);
      if (staffMember) {
        staffMember.active = false;
      }
    },
    activateStaff: (state, action) => {
      const staffMember = state.staff.find(s => s.id === action.payload);
      if (staffMember) {
        staffMember.active = true;
      }
    },
  },
});

export const { setStaff, addStaff, updateStaff, deleteStaff, deactivateStaff, activateStaff } = staffSlice.actions;
export default staffSlice.reducer;
