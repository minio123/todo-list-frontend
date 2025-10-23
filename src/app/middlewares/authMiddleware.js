import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/authenticate";

const authUser = createAsyncThunk(
  "auth/login",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.login(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateUser = createAsyncThunk(
  "auth/updateProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { authUser, updateUser };
