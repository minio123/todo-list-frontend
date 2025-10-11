import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Modal UI components
import WorkTodoModal from "./WorkTodoModal";

import {
  Box,
  Button,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  Tooltip,
  Checkbox,
  Chip,
} from "@mui/material";

// MUI ICONS
import {
  Add,
  Edit,
  Delete,
  Check,
  AccessTime,
  Warning,
  NotificationsActive,
} from "@mui/icons-material";

const WorkTodoIndex = () => {
  const location = useLocation();
  const locate = location.pathname.split("/");

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // State for fetching in edit to pass in modal
  const [dataTaskName, setDataTaskName] = useState("");
  const [dataDueDate, setDataDueDate] = useState(null);
  const [dataTaskStatus, setDataTaskStatus] = useState("");

  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("taskId");

  // State for Checkbox selection
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Pagination state
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(0);
  const paginationModel = { pdueDate: 0, pdueDateSize: pageSize };

  // Status colors
  const statusColors = {
    Done: "success",
    Pending: "warning",
    Overdue: "error",
    DueToday: "secondary",
  };

  // Status icons
  const statusIcons = {
    Done: <Check />,
    Pending: <AccessTime />,
    Overdue: <Warning />,
    DueToday: <NotificationsActive />,
  };

  // Columns and rows for the table
  const columns = [
    { field: "taskId", headerName: "Task ID", width: 120 },
    {
      field: "taskName",
      headerName: "Task name",
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        <Typography sx={{ fontWeight: "bold" }}>{params.value}</Typography>;
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
    },
    {
      headerName: "Actions",
    },
  ];

  const rows = [
    {
      taskId: "TAUG25-001",
      status: "DueToday",
      taskName: "Test",
      dueDate: "August 18, 2025",
    },
    {
      taskId: "TAUG25-002",
      status: "Done",
      taskName: "Test 1",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-003",
      status: "Done",
      taskName: "Test 2",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-004",
      status: "Done",
      taskName: "Test 3",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-005",
      status: "Done",
      taskName: "Test 4",
      dueDate: "July 16, 2025",
    },
    {
      taskId: "TAUG25-006",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-007",
      status: "Pending",
      taskName: "Test 6",
      dueDate: "August 12, 2025",
    },
    {
      taskId: "TAUG25-008",
      status: "Overdue",
      taskName: "Test 6",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-009",
      status: "Overdue",
      taskName: "Test 8",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-010",
      status: "Done",
      taskName: "Test",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-011",
      status: "Done",
      taskName: "Test 1",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-012",
      status: "Done",
      taskName: "Test 2",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-013",
      status: "Done",
      taskName: "Test 3",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-014",
      status: "Done",
      taskName: "Test 4",
      dueDate: "July 16, 2025",
    },
    {
      taskId: "TAUG25-015",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-016",
      status: "Done",
      taskName: "Test 1",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-017",
      status: "Done",
      taskName: "Test 2",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-018",
      status: "Done",
      taskName: "Test 3",
      dueDate: "July 26, 2025",
    },
    {
      taskId: "TAUG25-019",
      status: "Done",
      taskName: "Test 4",
      dueDate: "July 16, 2025",
    },
    {
      taskId: "TAUG25-020",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-021",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-022",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-023",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-024",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
    {
      taskId: "TAUG25-025",
      status: "Pending",
      taskName: "Test 5",
      dueDate: "August 15, 2025",
    },
  ];

  // Row Colors based on status
  const rowColors = {
    Done: "#d4edda",
    Pending: "#fff3cd",
    Overdue: "#f8d7da",
    DueToday: "#f8dbfdff",
  };

  // Function to handle select all checkbox
  // This will toggle the selection of all rows
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((row) => row.taskId));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (taskId) => {
    if (selectedRows.includes(taskId)) {
      setSelectedRows(selectedRows.filter((id) => id !== taskId));
    } else {
      setSelectedRows([...selectedRows, taskId]);
    }
  };

  useEffect(() => {
    setSelectAll(selectedRows.length === rows.length && rows.length > 0);
    //test data for edit data fetched
    setDataTaskName("test");
    setDataDueDate("2025-08-01");
    setDataTaskStatus("Done");
  }, [selectedRows, rows.length]);

  // function for modal
  const [modalState, setModalState] = useState(false);
  const [modalProcess, setModalProcess] = useState("");

  // Object for modal states
  const modalObj = { modalState, modalProcess, setModalState, setModalProcess };

  // Object for fetched data from db to be passed in the modal for update
  const fetchedDataObj = { dataTaskName, dataDueDate, dataTaskStatus };

  //  Object for functions to be passed in modal
  const functionsObj = {
    // functions here...
  };

  return (
    <Box
      mt={2}
      sx={{
        height: "100%",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          height: "100%",
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
        <Box
          sx={{
            padding: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              width: isMdUp ? "auto" : "100%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: isMdUp ? "auto" : "100%",
                height: "50px",
              }}
              onClick={() => {
                setModalState(true);
                setModalProcess("add");
              }}
            >
              Add Task <Add />
            </Button>

            {selectedRows.length > 0 ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    width: isMdUp ? "auto" : "100%",
                    height: "50px",
                  }}
                >
                  Mark as Done &nbsp;
                  <Check />
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    width: isMdUp ? "auto" : "100%",
                    height: "50px",
                  }}
                >
                  Mark as Pending &nbsp;
                  <AccessTime />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    width: isMdUp ? "auto" : "100%",
                    height: "50px",
                  }}
                >
                  Delete To-Do &nbsp;
                  <Delete />
                </Button>
              </>
            ) : (
              ""
            )}
          </Box>

          <Box sx={{ width: isMdUp ? "auto" : "100%" }}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              sx={{ width: isMdUp ? "auto" : "100%" }}
            />
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 800, borderRadius: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectAll}
                    onClick={handleSelectAll}
                  />
                </TableCell>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={
                        column.headerName == "Actions"
                          ? "actions"
                          : column.field
                      }
                      style={{ width: column.width || "auto" }}
                    >
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : "asc"}
                        onClick={() => {
                          if (orderBy !== column.field) {
                            setOrder("asc"); // Reset to ASC when switching columns
                          } else {
                            setOrder(order === "asc" ? "desc" : "asc");
                          }
                          setOrderBy(column.field);
                          setLastSortedColumn(column.field);
                        }}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={row.taskId} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.includes(row.taskId)}
                      onChange={() => handleRowSelect(row.taskId)}
                    />
                  </TableCell>
                  {columns.map((column) => {
                    if (column.headerName !== "Actions") {
                      if (column.field === "status") {
                        return (
                          <TableCell key={column.field}>
                            <Chip
                              variant="outlined"
                              label={
                                row.status === "DueToday"
                                  ? "Due Today"
                                  : row.status
                              }
                              color={statusColors[row.status]}
                              icon={statusIcons[row.status]}
                              size="small"
                              sx={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                                backgroundColor: rowColors[row.status],
                              }}
                            />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.field}>
                            <Typography
                              color={
                                row.status === "Overdue" ? "error" : "inherit"
                              }
                            >
                              {row[column.field]}
                            </Typography>
                          </TableCell>
                        );
                      }
                    } else {
                      return (
                        <TableCell key={column.headerName + i}>
                          <Tooltip title="Edit Task" arrow>
                            <IconButton
                              aria-label="edit"
                              color="primary"
                              size="large"
                              onClick={() => {
                                setModalState(true);
                                setModalProcess("edit");
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length} // Total number of rows
          page={paginationModel.pdueDate} // Current page index
          rowsPerPage={paginationModel.pdueDateSize} // Number of rows per page
          onPageChange={(event, newPage) => {
            //  This function triggers both next page/prevoius page and also for the last page
            paginationModel.pdueDate = newPage; // Update current page
            setPage(newPage); // Update page state
          }}
          onRowsPerPageChange={(event) => {
            console.log(event.target.value);
            setPageSize(event.target.value); // Update rows per page
          }}
          labelRowsPerPage="Rows per page"
          rowsPerPageOptions={[25, 50, 100, 500]} // Options for rows per page
          showFirstButton
          showLastButton
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
          sx={{ marginTop: "1em" }}
        />
      </Box>

      <WorkTodoModal
        modalObj={modalObj}
        fetchedDataObj={fetchedDataObj}
        functionsObj={functionsObj}
      />
    </Box>
  );
};

export default WorkTodoIndex;
