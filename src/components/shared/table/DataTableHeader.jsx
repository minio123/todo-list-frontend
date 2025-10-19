import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux

// MUI components
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from "@mui/material";

import { sort } from "../../../app/slices/dataTableSlice";

const DataTableHeader = ({ columns }) => {
  const dispatch = useDispatch();
  const { sortBy, sortDirection } = useSelector((state) => state.dataTable);

  // Table header columns function
  const tableColumnHeader = () => {
    const tableColumns = columns.map((column) => {
      if (column.sortable !== false) {
        return (
          <TableCell
            key={`table_cell_${column.field}`}
            style={{ width: column.width || "auto" }}
            onClick={() =>
              dispatch(
                sort({
                  sortBy: column.field,
                  sortDirection: sortDirection === "asc" ? "desc" : "asc",
                })
              )
            }
          >
            <TableSortLabel
              key={`table_sort_label_${column.field}`}
              active={sortBy === column.field ? true : false}
              direction={sortBy === column.field ? sortDirection : "asc"}
            >
              <Typography
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {column.headerName}
              </Typography>
            </TableSortLabel>
          </TableCell>
        );
      } else {
        return (
          <TableCell
            key={column.field ? `table_cell_${column.field}` : "table_cell"}
            style={{ width: column.width || "auto" }}
          >
            <Typography
              style={{
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {column.headerName}
            </Typography>
          </TableCell>
        );
      }
    });

    return tableColumns;
  };

  return (
    <TableHead>
      <TableRow key={1}>{tableColumnHeader()}</TableRow>
    </TableHead>
  );
};

export default DataTableHeader;
