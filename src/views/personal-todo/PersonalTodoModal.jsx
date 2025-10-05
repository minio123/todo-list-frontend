import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux slices
import { toggleModal } from "../../app/slices/personalTodoSlice";
import { showMessage } from "../../app/slices/snackMessageSlice";

// middleware->actions
// import { requestCreate } from "../../app/actions/personalTodoAction";

// API MIDDLEWARE ACTIONS
import { createPersonalTasks } from "../../app/middlewares/personalTodoMiddleware";

// MUI COMPONENTS
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

//MUI DATE PICKER
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const PersonalTodoModal = () => {
  const theme = useTheme();
  const today = new Date();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Local states
  const [localTaskName, setLocalTaskName] = useState("");
  const [localDueDate, setLocalDueDate] = useState(today);
  const [localTaskStatus, setLocalTaskStatus] = useState("Pending");

  // Redux states
  const dispatch = useDispatch();
  const { modalState, processType, response } = useSelector(
    (state) => state.personalTodo.modal
  );

  const { taskName, dueDate, taskStatus } = useSelector(
    (state) => state.personalTodo.modal
  );

  // DROPDOWN OPTIONS
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Done", label: "Done" },
    { value: "DueToday", label: "Due Today" },
    { value: "Overdue", label: "Overdue" },
  ];

  // Function for modal reset
  const resetModal = (action) => {
    setLocalTaskName("");
    setLocalDueDate(today);
    setLocalTaskStatus("Pending");

    if (action === "cancel") {
      dispatch(toggleModal(false));
      dispatch(
        showMessage({
          open: true,
          severity: "warning",
          message: "Modal closed",
        })
      );
    }
  };

  // Function for setting the value of the states for saving
  const submitCreate = () => {
    // Dispatch action to save the data
    // Always set the responseStatus to 'processing' when initiating the save
    // 'processing' status can be used to show a loading indicator if needed
    // The actual success or failure status will be set based on the API response

    dispatch(
      createPersonalTasks({
        taskName: localTaskName,
        dueDate: dayjs(localDueDate).format("YYYY-MM-DD"),
        taskStatus: localTaskStatus,
      })
    );
  };

  // useEffect for the setting value of the states for edit
  useEffect(() => {
    if (response && response.status && response.message) {
      dispatch(
        showMessage({
          open: true,
          severity: response.status,
          message: response.message,
        })
      );
      resetModal();
    }
  }, [dispatch, response]);

  useEffect(() => {
    if (processType === "edit") {
      setLocalTaskName(taskName);
      setLocalDueDate(dueDate);
      setLocalTaskStatus(taskStatus);
    }
  }, [processType, taskName, dueDate, taskStatus]);

  return (
    <>
      <Modal
        open={modalState}
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
            padding: 4,
            width: isMdUp ? "35%" : "85%",
            borderRadius: "8px",
            zIndex: 1300,
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
          color={theme.palette.text.primary}
        >
          {/* Modal header */}
          <Typography
            variant="h5"
            component="div"
            id="modal-modal-title"
            textTransform={"uppercase"}
            fontWeight={600}
          >
            {processType} Personal Todo
          </Typography>
          {/* Modal content goes here */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: isMdUp ? "row" : "column",
              // alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Todo Name (Required)"
              placeholder="Enter your task"
              size="small"
              fullWidth
              sx={{ height: "50px", marginBottom: "-1em" }}
              value={localTaskName}
              onChange={(e) => setLocalTaskName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  marginTop: "-.5em",
                  width: "100%",
                }}
              >
                <DatePicker
                  label="Duedate (Required)"
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        paddingTop: 0,
                        width: "100%",
                      },
                    },
                  }}
                  minDate={processType === "add" ? dayjs() : dayjs(dueDate)}
                  onChange={(newValue) => {
                    setLocalDueDate(dayjs(newValue).format("YYYY-MM-DD"));
                  }}
                  value={dayjs(localDueDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel id="select-task-status">Status (Required)</InputLabel>
              <Select
                labelId="select-task-status"
                id="task-status"
                label="Status (Required)"
                size="small"
                value={localTaskStatus}
                onChange={(e) => setLocalTaskStatus(e.target.value)}
              >
                {statusOptions.map((statusOptions, i) => {
                  return (
                    <MenuItem value={statusOptions.value}>
                      {statusOptions.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {/*Modal footer*/}
          <Box
            sx={
              isMdUp
                ? { display: "flex", justifyContent: "flex-end", mt: 2 }
                : { display: "flex", flexDirection: "column", gap: 1, mt: 2 }
            }
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Handle save action here
                submitCreate();
              }}
              sx={{
                width: isMdUp ? "150px" : "100%",
                marginRight: 1,
              }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                resetModal("cancel");
              }}
              sx={{
                width: isMdUp ? "150px" : "100%",
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

export default PersonalTodoModal;
