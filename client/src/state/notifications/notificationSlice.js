import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    loadingStop: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    errorNotification: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    successNotification: (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = null;
    },
    clearNotification: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  loadingStart,
  loadingStop,
  errorNotification,
  successNotification,
  clearNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
