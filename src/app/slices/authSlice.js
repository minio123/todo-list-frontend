import { createSlice } from "@reduxjs/toolkit";

import { authUser, updateUser } from "../middlewares/authMiddleware";

const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    isLoggedIn: false,
    response: [],
    user: [],
    userData: [],
  },
  reducers: {
    loggedUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.response = [];
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.response = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.response = action.payload;
    });
  },
});

export const { logoutUser, loggedUser } = authUserSlice.actions;
export default authUserSlice.reducer;
