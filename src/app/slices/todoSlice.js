import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// Importing thunks and api calls
import { fetchTodo, createTodo } from "../middlewares/todoMiddleware";

// Data Table Slice
const todoSlice = createSlice({
  name: "dataTable",
  initialState: {
    rows: [],
    selectedRows: [],
    response: [],
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
    builder.addCase(createTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Exporting actions
export const { setSelectedRows, response } = todoSlice.actions;

// Exporting reducers
export const todoReducer = todoSlice.reducer;
