import { createSlice } from "@reduxjs/toolkit";

const snackMessageSlice = createSlice({
  name: "snackMessage",
  initialState: {
    open: false,
    message: null,
    severity: null, // 'error', 'warning', 'info', 'success'
  },
  reducers: {
    showMessage: (state, action) => {
      const { open, severity, message } = action.payload;
      if (severity && message) {
        state.open = open;
        state.severity = severity;
        state.message = message;
      } else {
        state.open = false;
      }
    },
  },
});

export const { showMessage } = snackMessageSlice.actions;
export default snackMessageSlice.reducer;
