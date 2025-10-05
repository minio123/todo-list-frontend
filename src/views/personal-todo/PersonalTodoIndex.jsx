import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

//DataTable component
import DataTable from "./DataTable";

// Modal UI components
import PersonsalTodoModal from "./PersonalTodoModal";

// Middleware
import { fetchPersonalTasks } from "../../app/middlewares/personalTodoMiddleware";

// MUI Components

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

// MUI ICONS
import { Add, Delete, Check, AccessTime } from "@mui/icons-material";
import { toggleModal, search } from "../../app/slices/personalTodoSlice";

const PersonalTodoIndex = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locate = location.pathname.split("/");

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Table redux states
  const selectedRows = useSelector(
    (state) => state.personalTodo.dataTable.selectedRows
  );

  return (
    <Box mt={2} p={2}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          mb={2}
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          // }}
        >
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ flexGrow: 1, fontWeight: "600", padding: 1 }}
            textTransform={"uppercase"}
          >
            {locate.join(" > ")}
          </Typography>
        </Box>

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
              dispatch(
                toggleModal({
                  modalState: true,
                  processType: "add",
                  confirmationState: null,
                })
              );
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
        <Box
          sx={{
            padding: "2em",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
            mb: 2,
            borderRadius: "15px",
            bgcolor: theme.palette.background.default,
          }}
        >
          <Box sx={{ width: isMdUp ? "auto" : "100%" }}>
            <TextField
              id="outlined-search"
              label="Search field"
              size="small"
              type="search"
              sx={{ width: isMdUp ? "400px" : "100%", marginBottom: "15px" }}
              onChange={(e) => {
                dispatch(search(e.target.value));
                dispatch(fetchPersonalTasks());
              }}
            />
          </Box>

          <DataTable />
        </Box>
      </Box>

      {/* MODALS */}
      <PersonsalTodoModal />

      {/* <ConfirmModal /> */}
    </Box>
  );
};

export default PersonalTodoIndex;
