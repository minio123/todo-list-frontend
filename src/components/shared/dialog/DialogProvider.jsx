import React, { useState } from "react";
import DialogContext from "./DialogContext";

//MUI components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

//MUI icons
import { Help, Warning, CheckCircle } from "@mui/icons-material";

const DialogProvider = ({ children }) => {
  const dialogIcons = {
    success: <CheckCircle />,
    error: <Warning />,
    info: <Help sx={{ fontSize: "24px" }} />,
  };

  const [options, setOptions] = useState(null);
  const [resolver, setResolver] = useState(null);

  const openDialog = (opts) => {
    setOptions(opts);
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result) => {
    setOptions(null);
    if (resolver) resolver(result);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      <Dialog open={!!options} onClose={() => handleClose(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "top",
            gap: "5px",
          }}
        >
          <Typography component="span" color={options?.icon || "primary"}>
            {options?.icon ? dialogIcons[options.icon] : null}
          </Typography>
          {options?.title || "Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {options?.message || "Are you sure?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(false)}
            // variant="contained"
            // color="error"
          >
            {options?.cancelText || "Cancel"}
          </Button>
          <Button
            onClick={() => handleClose(true)}
            // variant="contained"
            // color="success"
            autoFocus
          >
            {options?.confirmText || "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
