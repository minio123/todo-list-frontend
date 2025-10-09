import { createSlice } from "@reduxjs/toolkit";

const dataTableSlice = createSlice({
  name: "DataTable",
  initialState: {
    loading: false,
    searchTxt: "",
    currentPage: 0,
    sortBy: "created_at",
    sortDirection: "desc",
    itemsPerPage: 5,
  },
  reducers: {
    search: (state, action) => {
      state.searchTxt = action.payload;
    },
    paginate: (state, action) => {
      state.currentPage = action.payload;
    },
    sort: (state, action) => {
      const { sortBy, sortDirection } = action.payload;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    checkId: (state, action) => {
      state.selectedRows = action.payload;
    },
    setLoad: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Exporting actions
export const { search, paginate, setItemsPerPage, sort, setId, setLoad } =
  dataTableSlice.actions;
// Exporting reducers
export const dataTableReducer = dataTableSlice.reducer;
