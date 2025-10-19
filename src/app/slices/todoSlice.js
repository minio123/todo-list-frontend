import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// Importing thunks and api calls
import {
  fetchTodo,
  createTodo,
  updateTodo,
  updateStatus,
  deleteTodo,
} from "../middlewares/todoMiddleware";

// Data Table Slice
const todoSlice = createSlice({
  name: "dataTable",
  initialState: {
    rows: [],
    selectedRows: [],
    response: [],
    totalRows: 0,
    category: "",
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action.payload.data;
      state.totalRows = action.payload.totalItems;
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
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateStatus.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Exporting actions
export const { setSelectedRows, response, setCategory } = todoSlice.actions;

// Exporting reducers
export const todoReducer = todoSlice.reducer;
