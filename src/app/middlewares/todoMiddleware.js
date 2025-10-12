import { createAsyncThunk } from "@reduxjs/toolkit";

//API calls
import * as api from "../api/personalTodo";

// Simulate an API call to fetch tasks
const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async (_, { getState, rejectWithValue }) => {
    const state = getState().dataTable;
    const params = {
      search: state.searchTxt,
      page: state.currentPage,
      itemsPerPage: state.itemsPerPage,
      sortBy: state.sortBy,
      sortDirection: state.sortDirection,
    };
    try {
      const response = await api.fetchTodo(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulate an API call to create tasks
const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await api.createTodo(todoData);
      return response; // Return the created task data for simplicity
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await api.updateTodo(todoData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchTodo, createTodo, updateTodo };
