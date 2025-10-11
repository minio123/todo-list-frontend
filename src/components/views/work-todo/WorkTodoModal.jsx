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

const WorkTodoModal = ({ modalObj, fetchedDataObj, functionsObj }) => {
  const theme = useTheme();
  const today = new Date();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { modalState, modalProcess, setModalState, setModalProcess } = modalObj;
  const { dataTaskName, dataDueDate, dataTaskStatus } = fetchedDataObj;

  // DROPDOWN OPTIONS
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Done", label: "Done" },
    { value: "Due Today", label: "Due Today" },
    { value: "Overdue", label: "Overdue" },
  ];

  // STATE FOR MODAL
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [taskStatus, setTaskStatus] = useState("Pending");

  // FUNCTION FOR CLEARING MODAL FIELDS
  const clearModalFields = () => {
    setTaskName("");
    setDueDate(dayjs());
    setModalProcess("");
  };

  // useEffect for the setting value of the states for edit
  useEffect(() => {
    if (modalProcess == "edit") {
      setTaskName(dataTaskName);
      setDueDate(dataDueDate);
      setTaskStatus(dataTaskStatus);
    }
  }, [modalProcess]);

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
            width: isMdUp ? "30%" : "85%",
            borderRadius: "8px",
            zIndex: 1300,
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          {/* Modal header */}
          <Typography
            variant="h5"
            component="div"
            id="modal-modal-title"
            textTransform={"uppercase"}
            fontWeight={600}
            color={theme.palette.text.primary}
          >
            {modalProcess} Work Todo
          </Typography>
          {/* Modal content goes here */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: isMdUp ? "row" : "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Task Name (Required)"
              placeholder="Enter your task"
              size="medium"
              fullWidth
              sx={{ height: "50px" }}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Duedate (Required)"
                  slotProps={{
                    textField: {
                      size: "medium",
                      fullWidth: true,
                      sx: { height: "56px" },
                    },
                  }}
                  minDate={modalProcess === "add" ? dayjs() : dayjs(dueDate)}
                  sx={{ width: "100%" }}
                  onChange={(newValue) => {
                    setDueDate(dayjs(newValue).format("YYYY-MM-DD"));
                  }}
                  value={dayjs(dueDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel id="select-task-status">Status (Required)</InputLabel>
              <Select
                labelId="select-task-status"
                id="task-status"
                label="Status (Required)"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
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
                setModalState(false);
              }}
              sx={{
                width: isMdUp ? "150px" : "100%",
                height: "50px",
                marginRight: 1,
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setModalState(false);
                clearModalFields();
              }}
              sx={{
                width: isMdUp ? "150px" : "100%",
                height: "50px",
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WorkTodoModal;
