import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  signInSuccess,
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
