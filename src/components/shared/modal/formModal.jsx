import React from "react";

//MUI components
import { Modal, Box, IconButton, useTheme, Typography } from "@mui/material";

//MUI icons
import { Close, OpenInFull } from "@mui/icons-material";

const FormModal = ({ open, modalHeader, onClose, children, size = "md" }) => {
  const theme = useTheme();

  const modalSizes = {
    xl: "80%",
    lg: "70%",
    md: "60%",
    sm: "50%",
    xs: "40%",
  };

  return (
    <Modal
      open={open}
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
          width: { xs: "80%", md: modalSizes[size] },
          borderRadius: "15px",
          zIndex: 1300,
          outline: "none",
          border: "none",
        }}
        color={theme.palette.text.primary}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="span"
            component="span"
            sx={{
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            {modalHeader}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box
          sx={{
            marginTop: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default FormModal;
