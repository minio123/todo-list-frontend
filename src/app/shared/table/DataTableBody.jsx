import React from "react";
import { useSelector } from "react-redux";

// MUI components
import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Skeleton,
} from "@mui/material";

const DataTableBody = ({ rows, columns }) => {
  const { load } = useSelector((state) => state.dataTable);

  // Table body rows function
  const tableRows = () => {
    // if (load) {
    //   return (
    //     <TableRow key={1}>
    //       <TableCell colSpan={columns.length + 1}>
    //         <Skeleton />
    //       </TableCell>
    //     </TableRow>
    //   );
    // }
    if (rows.length > 0) {
      const tableRows = rows.map((row, i) => {
        return (
          <TableRow key={row.todo_id} hover>
            {columns.map((column) => {
              return (
                <TableCell key={`${column.field}_${i}`}>
                  <Typography component="span">{row[column.field]}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
      return tableRows;
    } else {
      return (
        <TableRow key={1}>
          <TableCell colSpan={columns.length + 1}>
            <Typography sx={{ textAlign: "center" }}>No data found</Typography>
          </TableCell>
        </TableRow>
      );
    }
  };

  return <TableBody>{tableRows()}</TableBody>;
};

export default DataTableBody;
