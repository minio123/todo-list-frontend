import { use, useEffect, useMemo, useState } from "react";
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
import FormModal from "../../shared/modal/FormModal";

// Middleware
import {
  fetchTodo,
  createTodo,
  updateTodo,
  updateStatus,
  deleteTodo,
} from "../../../app/middlewares/todoMiddleware";

// Context
import { useDialog } from "../../shared/dialog/DialogContext";

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
  const dialog = useDialog();
  const dispatch = useDispatch();
  const location = useLocation();
  const locate = location.pathname.split("/");

  const theme = useTheme();
  const isMdUp = theme.breakpoints.up("md");

  // Add modal form state
  const [todoName, setTodoName] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [status, setStatus] = useState("pending");
  const [todoId, setTodoId] = useState("");

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
  const { rows, selectedRows, totalRows } = useSelector((state) => state.todo);

  // Datatable functions
  const fetch = async () => {
    dispatch(fetchTodo());
  };

  const handleSelectAll = () => {
    setCheckAll((prev) => {
      const next = !prev;
      if (next) {
        dispatch(setSelectedRows(rows.map((row) => row.id)));
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
          checked={selectedRows.includes(row.id)}
          onChange={() => handleRowSelect(row.id)}
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
          color="info"
          size="small"
          onClick={() => fillModal(row)}
        >
          Edit
        </Button>
      ),
    }));
  }, [rows, selectedRows]);

  // Modals state and hooks
  const [opType, setOpType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    const confirm = await dialog({
      icon: "info",
      title: "Are you sure?",
      message: "This action cannot be undone.",
      showButton: true,
    });
    console.log(confirm);
    if (!confirm) return;
    resetModal();
  };

  const resetModal = () => {
    setOpen(false);
    setTodoName("");
    setDeadline(null);
    setStatus("pending");
    setOpType("");
    setTodoId("");
  };

  // Modal functions
  const saveChanges = async () => {
    let response = "";
    let res_status = "";
    const todoData = {
      todoName: todoName,
      deadline: dayjs(deadline).format("YYYY-MM-DD HH:mm:ss"),
      status: status,
      category: "personal",
    };
    if (opType === "update") {
      todoData.todo_id = todoId;
      response = await dispatch(updateTodo(todoData));
      res_status = response.payload;
    } else {
      response = await dispatch(createTodo(todoData));
      res_status = response.payload;
    }

    if (res_status.status === "success") {
      fetch();
      resetModal();
    }
    dispatch(
      showMessage({
        open: true,
        severity: res_status.status,
        message: res_status.message,
      })
    );
  };

  const fillModal = (data) => {
    setOpType("update");
    setTodoName(data.todo_name);
    setDeadline(dayjs(data.deadline));
    setStatus(data.status);
    setTodoId(data.id);
    setOpen(true);
  };

  // Action button functions
  const handleStatusUpdate = async (status) => {
    const confirm = await dialog({
      icon: "info",
      title: "Update Todo(s)",
      message:
        "Are you sure you want to update the status of the checked rows?",
      showButton: true,
    });

    if (!confirm) return;

    const todoData = {
      todo_id: selectedRows,
      status: status,
    };

    const response = await dispatch(updateStatus(todoData));
    const res_status = response.payload;
    if (res_status.status === "success") {
      dispatch(setSelectedRows([]));
      setCheckAll(false);
      fetch();
    }
    dispatch(
      showMessage({
        open: true,
        severity: res_status.status,
        message: res_status.message,
      })
    );
  };

  const handleDelete = async () => {
    const confirm = await dialog({
      icon: "info",
      title: "Delete Todo(s)",
      message:
        "Are you sure you want to delete the checked rows? This action cannot be undone.",
      showButton: true,
    });

    if (!confirm) return;
    const todoData = {
      todo_id: selectedRows,
    };
    const response = await dispatch(deleteTodo(todoData));
    const res_status = response.payload;
    if (res_status.status === "success") {
      dispatch(setSelectedRows([]));
      setCheckAll(false);
      fetch();
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
          handlers={{ handleOpen, setOpType, handleStatusUpdate, handleDelete }}
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
          <DataTable columns={columns} rows={customRow} totalRows={totalRows} />
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
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
                <MenuItem value={"dueToday"}>Due Today</MenuItem>
                <MenuItem value={"overdue"}>Overdue</MenuItem>
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
              onClick={saveChanges}
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

      {/* {Dialog} */}
      {/* <ConfirmationDialog
        icon={""}
        title={""}
        text={""}
        dialogState={dialogState}
      /> */}
    </Box>
  );
};

export default PersonalTodoIndex;
