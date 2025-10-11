import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// For datetime picker
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

// utils
import {
  statusColors,
  statusIcons,
  rowColors,
} from "../../../app/utils/colors";

//Components
import ActionButtons from "./ActionButtons";
import DataTable from "../../shared/table/DataTable";
import FormModal from "../../shared/modal/FormModal.jsx";

// Middleware
import { fetchTodo, createTodo } from "../../../app/middlewares/todoMiddleware";

//Redux actions
import { setSelectedRows } from "../../../app/slices/todoSlice";

// Snackbar
import { showMessage } from "../../../app/slices/snackMessageSlice.js";

// MUI components
import {
  Box,
  useTheme,
  Typography,
  Chip,
  Button,
  Checkbox,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const PersonalTodoIndex = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locate = location.pathname.split("/");

  const theme = useTheme();
  const isMdUp = theme.breakpoints.up("md");

  // Add modal form state
  const [todoName, setTodoName] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [status, setStatus] = useState("Pending");

  // Datatable columns
  const columns = [
    {
      field: "check",
      headerName: (
        <Checkbox color="primary" onClick={() => handleSelectAll()} />
      ),
      sortable: false,
      width: 50,
    },
    { field: "todo_id", headerName: "To-do ID", width: 120 },
    {
      field: "todo_name",
      headerName: "To-do name",
    },
    {
      field: "statusChip",
      headerName: "Status",
      componentType: "span",
    },
    {
      field: "deadline",
      headerName: "Deadline",
    },
    {
      headerName: "Actions",
      field: "actions",
      sortable: false,
    },
  ];

  // Datatable redux states
  const { searchTxt, currentPage, itemsPerPage, sortBy, sortDirection } =
    useSelector((state) => state.dataTable);
  const { rows, selectedRows } = useSelector((state) => state.todo);

  // Datatable functions
  const fetch = async () => {
    dispatch(fetchTodo());
  };

  const handleSelectAll = () => {
    setCheckAll((prev) => {
      const next = !prev;
      if (next) {
        dispatch(setSelectedRows(rows.map((row) => row.todo_id)));
      } else {
        dispatch(setSelectedRows([]));
      }
      return next;
    });
  };

  const handleRowSelect = (todo_id) => {
    if (selectedRows.includes(todo_id)) {
      dispatch(setSelectedRows(selectedRows.filter((id) => id !== todo_id)));
    } else {
      dispatch(setSelectedRows([...selectedRows, todo_id]));
    }
  };

  const [checkAll, setCheckAll] = useState(false);
  const customRow = useMemo(() => {
    return rows.map((row) => ({
      ...row,
      check: (
        <Checkbox
          color="primary"
          checked={selectedRows.includes(row.todo_id)}
          onChange={() => handleRowSelect(row.todo_id)}
        />
      ),
      statusChip: (
        <Chip
          variant="outlined"
          label={row.status === "DueToday" ? "Due Today" : row.status}
          color={statusColors[row.status]}
          icon={statusIcons[row.status]}
          size="small"
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
            backgroundColor: rowColors[row.status],
          }}
        />
      ),
      actions: (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => console.log("Test click")}
        >
          Edit
        </Button>
      ),
    }));
  }, [rows, selectedRows]);

  // Modals state and hooks
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTodoName("");
    setDeadline(null);
    setStatus("Pending");
  };

  // Modal functions
  const saveTodo = async () => {
    const newTodo = {
      todoName: todoName,
      deadline: dayjs(deadline).format("YYYY-MM-DD HH:mm:ss"),
      status: status,
      category: "personal",
    };
    const response = await dispatch(createTodo(newTodo));
    console.log(response.payload);
    const res_status = response.payload;

    if (res_status.status === "success") {
      fetch();
      handleClose();
    }
    dispatch(
      showMessage({
        open: true,
        severity: res_status.status,
        message: res_status.message,
      })
    );
  };
  // UseEffects
  useEffect(() => {
    fetch();
  }, [searchTxt, currentPage, itemsPerPage, sortBy, sortDirection]);

  useEffect(() => {
    if (selectedRows.length > 0) {
    }
  }, [selectedRows]);

  return (
    <Box mt={2} p={2}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box mb={2}>
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

        <ActionButtons
          isMdUp={isMdUp}
          selectedRows={selectedRows}
          handleOpen={handleOpen}
        />

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
          <DataTable columns={columns} rows={customRow} />
        </Box>
      </Box>

      {/* MODALS */}
      <FormModal
        modalHeader="Add Todo"
        open={isOpen}
        onClose={handleClose}
        size="xs"
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              required
              id="outlined-required"
              label="Todo Name (Required)"
              placeholder="Enter your task"
              size="small"
              fullWidth
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-task-status">Status (Required)</InputLabel>
              <Select
                labelId="select-task-status"
                id="task-status"
                label="Status (Required)"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
                <MenuItem value={"DueToday"}>Due Today</MenuItem>
                <MenuItem value={"Overdue"}>Overdue</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                id="outlined-required"
                label="Deadline (Required)"
                value={deadline}
                onChange={(newDeadline) => {
                  setDeadline(newDeadline);
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: {
                      width: "100%",
                      maxWidth: "100%",
                      "& .MuiInputBase-root": {
                        height: 36,
                        fontSize: "0.875rem",
                        alignItems: "center",
                      },
                      "& input": {
                        paddingTop: "8px",
                        paddingBottom: "8px",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            container
            size={{ md: 12 }}
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              onClick={saveTodo}
              sx={{
                width: "100px",
              }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              sx={{
                width: "100px",
              }}
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </FormModal>

      {/* <ConfirmModal /> */}
    </Box>
  );
};

export default PersonalTodoIndex;
