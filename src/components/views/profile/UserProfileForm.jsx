import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Snackbar
import { showMessage } from "../../../app/slices/snackMessageSlice.js";

// Context
import { useDialog } from "../../shared/dialog/DialogContext.jsx";

// Middleware
import { updateUser } from "../../../app/middlewares/authMiddleware";
// MUI components
import { Box, Button, TextField, Grid, FormControl } from "@mui/material";

const UserProfileForm = ({ setOpenForm, user }) => {
  const dispatch = useDispatch();
  const dialog = useDialog();
  // Local states
  const [firstName, setFirstName] = useState(user.firstname || "");
  const [middleName, setMiddleName] = useState(user.middlename || "");
  const [lastName, setLastName] = useState(user.lastname || "");
  const clearForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
  };

  const updateProfile = async () => {
    const params = {
      firstName,
      middleName,
      lastName,
    };

    const confirm = await dialog({
      title: "Confirm Update",
      message: "Are you sure you want to update your profile?",
      showButton: true,
    });

    if (!confirm) {
      return;
    }

    const response = await dispatch(updateUser(params));
    const res_status = response.payload;
    dispatch(
      showMessage({
        message: res_status.message,
        severity: res_status.status,
        open: true,
      })
    );

    if (res_status.status === "success") {
      setOpenForm(false);
      clearForm();
      window.location.reload();
    }
  };

  return (
    <Box component="form">
      <Grid>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </FormControl>
      </Grid>
      <Grid>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setMiddleName(e.target.value)}
            value={middleName}
          />
        </FormControl>
      </Grid>
      <Grid>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </FormControl>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={updateProfile}
        >
          Save Changes
        </Button>
      </Grid>
    </Box>
  );
};

export default UserProfileForm;
