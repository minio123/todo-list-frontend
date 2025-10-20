import React from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI components
import { TablePagination } from "@mui/material";

// Redux actions
import { paginate, setItemsPerPage } from "../../../app/slices/dataTableSlice";

const DataTablePaging = ({ totalRows }) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector((state) => state.dataTable);

  return (
    <TablePagination
      sx={{
        width: "100%",
      }}
      component="Box"
      count={totalRows} // Total number of rows
      page={currentPage} // Current page index
      rowsPerPage={itemsPerPage} // Number of rows per page
      onPageChange={(event, newPage) => {
        //  This function triggers both next page/prevoius page and also for the last page
        dispatch(paginate(newPage)); // Update current page
        // setPage(newPage); // Update page state
      }}
      onRowsPerPageChange={(event) => {
        dispatch(setItemsPerPage(event.target.value)); // Update rows per page
      }}
      labelRowsPerPage="Rows per page"
      rowsPerPageOptions={[5, 10, 25, 50]} // Options for rows per page
      showFirstButton
      showLastButton
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
      }
    />
  );
};

export default DataTablePaging;
