import React from "react";
import { useSelector, useDispatch } from "react-redux";
// MUI COMPONENTS
import { Snackbar, Alert, Grow } from "@mui/material";

// Slice utils
import { showMessage } from "../../app/slices/snackMessageSlice";

const snackMessage = () => {
  const dispatch = useDispatch();

  // Redux states
  const { open, message, severity } = useSelector(
    (state) => state.snackMessage
  );

  const closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(showMessage({ open: false }));
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={closeSnack}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={closeSnack}
        >
          {message ? message : "test"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default snackMessage;
