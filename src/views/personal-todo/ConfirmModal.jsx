import React, { useEffect, useState } from "react";

// MUI COMPONENTS
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Fade,
  Backdrop,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { HelpOutlineOutlined, Report } from "@mui/icons-material";
const ConfirmModal = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  //useEffect for this component
  useEffect(() => {
    // check if the confirmationProcess state has value
    //if yes it will show the modal
    if (!confirmationProcess) {
      getConfirmationMessage();
    }
  }, [confirmationProcess, setConfirmationState]);

  return (
    <>
      <Modal
        open={confirmationState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(3px)",
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            padding: 2,
            width: isMdUp ? "20%" : "85%",
            borderRadius: "8px",
            zIndex: 1300,
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
          color={theme.palette.text.primary}
        >
          {/* Modal content */}
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            {confirmationProcess === "delete" ? (
              <Report
                color="error"
                sx={{
                  fontSize: "8em",
                }}
              />
            ) : (
              <HelpOutlineOutlined
                color="info"
                sx={{
                  fontSize: "8em",
                }}
              />
            )}
            {getConfirmationMessage()}
          </Box>

          {/* Modal footer */}
          <Box
            sx={{
              display: isMdUp ? "flex" : "",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1em",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ height: "50px", width: "100px" }}
              onClick={() => {
                resetModal();
                setSnackSettings("success", "");
              }}
            >
              Proceed
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "50px", width: "100px" }}
              onClick={() => {
                resetModal();
                setSnackSettings("cancelled", "");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmModal;
