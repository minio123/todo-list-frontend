import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button } from "@mui/material";

// Middleware
// import {
//   markPersonalTasksAsPending,
//   markPersonalTasksAsDone,
// } from "../../app/middlewares/todoMiddleware";

// MUI ICONS
import { Add, Delete, Check, AccessTime } from "@mui/icons-material";

const ActionButtons = ({ isMdUp, selectedRows, handleOpen }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          width: "100%",
          marginBottom: "2em",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: isMdUp ? "auto" : "100%",
          }}
          onClick={() => {
            handleOpen();
          }}
        >
          Add Todo
          <Add />
        </Button>

        {selectedRows.length > 0 ? (
          <>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: isMdUp ? "auto" : "100%",
              }}
              onClick={() => {}}
            >
              Mark as Done &nbsp;
              <Check />
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{
                width: isMdUp ? "auto" : "100%",
              }}
              onClick={() => {}}
            >
              Mark as Pending &nbsp;
              <AccessTime />
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: isMdUp ? "auto" : "100%",
              }}
              onClick={() => {}}
            >
              Delete Todo &nbsp;
              <Delete />
            </Button>
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default ActionButtons;
