import { createAsyncThunk } from "@reduxjs/toolkit";

//API calls
import * as api from "../api/personalTodo";

// Simulate an API call to fetch tasks
const fetchPersonalTasks = createAsyncThunk(
  "personalTodo/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    const state = getState().personalTodo.dataTable;
    const params = {
      search: state.txtSearch,
      page: state.currentPage,
      itemsPerPage: state.itemsPerPage,
      columnSort: state.columnSort,
      sortDirection: state.sortDirection,
    };
    try {
      const response = await api.fetchTasks(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulate an API call to create tasks
const createPersonalTasks = createAsyncThunk(
  "personalTodo/createTasks",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await api.createTasks(taskData);
      return response; // Return the created task data for simplicity
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulate an API call to update tasks
const updatePersonalTasks = createAsyncThunk(
  "personalTodo/updateTasks",
  async (taskId, { rejectWithValue }) => {
    try {
      return { id: taskId }; // Return the updated task data for simplicity
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulate an API call to delete tasks
const deletePersonalTasks = createAsyncThunk(
  "personalTodo/deleteTasks",
  async (taskIds, { rejectWithValue }) => {
    try {
      return taskIds; // Return the IDs of deleted tasks for simplicity
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulate an API call to mark tasks as done
const markPersonalTasksAsDone = createAsyncThunk(
  "personalTodo/markTasksAsDone",
  async (taskIds, { rejectWithValue }) => {
    try {
      return taskIds; // Return the IDs of updated tasks for simplicity
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulate an API call to mark tasks as pending
const markPersonalTasksAsPending = createAsyncThunk(
  "personalTodo/markTasksAsPending",
  async (taskIds, { rejectWithValue }) => {
    try {
      return taskIds; // Return the IDs of updated tasks for simplicity
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export {
  fetchPersonalTasks,
  createPersonalTasks,
  updatePersonalTasks,
  deletePersonalTasks,
  markPersonalTasksAsDone,
  markPersonalTasksAsPending,
};
