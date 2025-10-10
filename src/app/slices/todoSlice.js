import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// Importing thunks and api calls
import { fetchTodo } from "../middlewares/todoMiddleware";

// Data Table Slice
const todoSlice = createSlice({
  name: "dataTable",
  initialState: {
    rows: [],
    selectedRows: [],
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Exporting actions
export const { setSelectedRows } = todoSlice.actions;

// Exporting reducers
export const todoReducer = todoSlice.reducer;
