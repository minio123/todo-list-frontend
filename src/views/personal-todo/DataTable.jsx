import React, { useEffect, useState } from "react";

// Redux actions
import {
  paginate,
  itemsPerPageChange,
  sort,
  setId,
  getPersonalTasks,
} from "../../app/slices/personalTodoSlice";

// utils
import { statusColors, statusIcons, rowColors } from "../../app/utils/colors";

// Middleware
import { fetchPersonalTasks } from "../../app/middlewares/personalTodoMiddleware";

// redux
import { useDispatch, useSelector } from "react-redux";

// MUI components
import {
  IconButton,
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

// MUI icons
import { Edit } from "@mui/icons-material";

const DataTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.down("sm"));

  // Local states
  const [checkAll, setCheckAll] = useState(false);

  // Table redux states
  const {
    rows,
    loading,
    txtSearch,
    currentPage,
    itemsPerPage,
    columnSort,
    sortDirection,
    selectedRows,
  } = useSelector((state) => state.personalTodo.dataTable);

  // Columns for the table
  const columns = [
    { field: "todo_id", headerName: "To-do ID", width: 120 },
    {
      field: "todo_name",
      headerName: "To-do name",
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        <Typography sx={{ fontWeight: "bold" }}>{params.value}</Typography>;
      },
    },
    {
      field: "deadline",
      headerName: "Due Date",
    },
    {
      headerName: "Actions",
    },
  ];

  // Function to handle select all checkzbox
  // This will toggle the selection of all rows
  const handleSelectAll = () => {
    setCheckAll(!checkAll); // Toggle the checkAll state
    if (checkAll && selectedRows.length > 0) {
      dispatch(setId([]));
    } else {
      dispatch(setId(rows.map((row) => row.todo_id)));
    }
  };

  const handleRowSelect = (todo_id) => {
    if (selectedRows.includes(todo_id)) {
      dispatch(setId(selectedRows.filter((id) => id !== todo_id)));
    } else {
      dispatch(setId([...selectedRows, todo_id]));
    }
  };
  // useEffect to fetch data when dependencies change
  useEffect(() => {}, [selectedRows]);
  useEffect(() => {
    dispatch(fetchPersonalTasks());
  }, [sortDirection, txtSearch, currentPage, itemsPerPage]);

  return (
    <>
      <TableContainer sx={{ borderRadius: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  // checked={selectAll}
                  onClick={handleSelectAll}
                />
              </TableCell>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={
                      column.headerName == "Actions" ? "actions" : column.field
                    }
                    style={{ width: column.width || "auto" }}
                  >
                    <TableSortLabel
                      active={columnSort === column.field}
                      direction={
                        columnSort === column.field ? sortDirection : "asc"
                      }
                      onClick={() => {
                        if (columnSort !== column.field) {
                          dispatch(
                            sort({
                              column: column.field,
                              direction:
                                sortDirection === "asc" ? "desc" : "asc",
                            })
                          );
                        } else {
                          dispatch(
                            sort({
                              column: column.field,
                              direction:
                                sortDirection === "asc" ? "desc" : "asc",
                            })
                          );
                        }
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
            {rows.length > 0 ? (
              rows.map((row, i) => (
                <TableRow key={row.todo_id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.includes(row.todo_id)}
                      onChange={() => handleRowSelect(row.todo_id)}
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
                      } else if (column.field === "deadline") {
                        return (
                          <TableCell key={column.field}>
                            <Typography
                              color={
                                row.status === "Overdue" ? "error" : "inherit"
                              }
                            >
                              {row[column.field]
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("/")}
                            </Typography>
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
                          <Tooltip title="Edit To-do" arrow>
                            <IconButton
                              aria-label="edit"
                              color="primary"
                              size="small"
                              onClick={() => {
                                dispatch(
                                  getPersonalTasks({
                                    taskId: row.todo_id,
                                    taskName: row.todo_name,
                                    taskStatus: row.status,
                                    dueDate: row.deadline,
                                  })
                                );
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Typography sx={{ textAlign: "center" }}>
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length} // Total number of rows
        page={currentPage} // Current page index
        rowsPerPage={itemsPerPage} // Number of rows per page
        onPageChange={(event, newPage) => {
          //  This function triggers both next page/prevoius page and also for the last page
          dispatch(paginate(newPage)); // Update current page
          // setPage(newPage); // Update page state
        }}
        onRowsPerPageChange={(event) => {
          dispatch(itemsPerPageChange(event.target.value)); // Update rows per page
        }}
        labelRowsPerPage="Rows per page"
        rowsPerPageOptions={[5, 10, 25, 50]} // Options for rows per page
        showFirstButton
        showLastButton
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
        }
        sx={{ marginTop: "1em" }}
      />
    </>
  );
};

export default DataTable;
