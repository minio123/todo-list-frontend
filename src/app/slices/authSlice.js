import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    isLoggedIn: false,
    response: [],
    user: [],
    accessToken: null,
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
});

export const { logoutUser, loggedUser } = authUserSlice.actions;
export default authUserSlice.reducer;
