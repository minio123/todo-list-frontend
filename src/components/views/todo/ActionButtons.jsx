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

const ActionButtons = ({ selectedRows, handlers }) => {
  const { handleOpen, setOpType, handleStatusUpdate, handleDelete } = handlers;
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
            width: { xs: "100%", md: "auto" },
          }}
          onClick={() => {
            handleOpen();
            setOpType("create");
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
                width: { xs: "100%", md: "auto" },
              }}
              onClick={() => {
                handleStatusUpdate("done");
              }}
            >
              Mark as Done &nbsp;
              <Check />
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{
                width: { xs: "100%", md: "auto" },
              }}
              onClick={() => {
                handleStatusUpdate("pending");
              }}
            >
              Mark as Pending &nbsp;
              <AccessTime />
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: { xs: "100%", md: "auto" },
              }}
              onClick={() => {
                handleDelete();
              }}
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
