import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// utils
import { statusColors, statusIcons, rowColors } from "../../app/utils/colors";

//Components
import ActionButtons from "./ActionButtons";
import DataTable from "../../app/shared/table/DataTable";

// Middleware
import { fetchTodo } from "../../app/middlewares/todoMiddleware";

//Redux actions
import { setSelectedRows } from "../../app/slices/todoSlice";

// MUI components

import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Chip,
  Button,
  Checkbox,
} from "@mui/material";

const PersonalTodoIndex = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locate = location.pathname.split("/");

  const theme = useTheme();

  const [checkAll, setCheckAll] = useState(false);

  // Table redux states
  const { searchTxt, currentPage, itemsPerPage, sortBy, sortDirection } =
    useSelector((state) => state.dataTable);

  const { rows, selectedRows } = useSelector((state) => state.todo);

  const fetch = async () => {
    console.log(searchTxt);
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

  // Table columns
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

        {/* <ActionButtons isMdUp={isMdUp} selectedRows={selectedRows} /> */}

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
      {/* <PersonsalTodoModal /> */}

      {/* <ConfirmModal /> */}
    </Box>
  );
};

export default PersonalTodoIndex;
