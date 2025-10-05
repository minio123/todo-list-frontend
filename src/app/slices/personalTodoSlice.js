import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// Importing thunks and api calls
import {
  fetchPersonalTasks,
  createPersonalTasks,
  updatePersonalTasks,
  deletePersonalTasks,
  markPersonalTasksAsDone,
  markPersonalTasksAsPending,
} from "../middlewares/personalTodoMiddleware";

const today = new Date();

// Data Table Slice
const dataTableSlice = createSlice({
  name: "dataTable",
  initialState: {
    rows: [],
    loading: false,
    status: null,
    txtSearch: "",
    currentPage: 0,
    itemsPerPage: 5,
    columnSort: "",
    sortDirection: "asc",
    selectedRows: [],
    processType: null, // e.g., 'delete', 'mark as done' and 'mark as pending'.
  },
  reducers: {
    search: (state, action) => {
      const searchTerm = action.payload;
      state.txtSearch = searchTerm;
    },
    paginate: (state, action) => {
      state.currentPage = action.payload;
      state.loading = true;
    },
    itemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload;
      state.loading = true;
    },
    sort: (state, action) => {
      const { column, direction } = action.payload;
      state.columnSort = column;
      state.sortDirection = direction;
      state.loading = true;
    },
    setId: (state, action) => {
      state.selectedRows = action.payload;
    },
    setLoad: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPersonalTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action.payload;
    });
    builder.addCase(fetchPersonalTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Modal Slice
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    processType: null, // e.g., 'add', 'edit', etc.
    modalState: false, // modal visibility
    taskId: null, // to hold the id of the item being processed
    response: null, // to hold the data returned from the last operation
    taskName: null, // to hold the name of the task being processed
    dueDate: dayjs(today).format("YYYY-MM-DD"), // to hold the due date of the task being processed
    taskStatus: null, // to hold the status of the task being processed
  },
  reducers: {
    toggleModal: (state, action) => {
      const { modalState, processType, confirmationState } = action.payload;
      state.modalState = modalState;
      state.processType = processType;
      state.confirmationState = confirmationState;
    },
    getPersonalTasks: (state, action) => {
      const { taskId, taskName, dueDate, taskStatus } = action.payload;
      state.taskId = taskId;
      state.taskName = taskName;
      state.dueDate = dueDate;
      state.taskStatus = taskStatus;
      state.modalState = true;
      state.processType = "edit";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalTasks.pending, (state) => {});
    builder.addCase(createPersonalTasks.fulfilled, (state, action) => {
      state.modalState = false;
      state.loading = true;
      state.response = action.payload;
    });
    builder.addCase(createPersonalTasks.rejected, (state, action) => {
      state.loading = true;
      state.response = action.payload;
    });
  },
});

// Exporting actions
export const { search, paginate, itemsPerPageChange, sort, setId } =
  dataTableSlice.actions;
export const { getPersonalTasks, toggleModal } = modalSlice.actions;

// Exporting reducers
export const dataTableReducer = dataTableSlice.reducer;
export const modalReducer = modalSlice.reducer;
