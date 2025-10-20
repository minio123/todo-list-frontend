import { useMemo } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

// MUI components
import { TableContainer, Table, TextField, Box, Paper } from "@mui/material";

// Custom datatable components
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import DataTablePaging from "./DataTablePaging";

// Redux actions
import { search } from "../../../app/slices/dataTableSlice";

const DataTable = ({ columns, rows, totalRows }) => {
  const dispatch = useDispatch();

  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        dispatch(search(term));
      }, 300),
    []
  );

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
        }}
      >
        <TextField
          id="outlined-search"
          label="Search field"
          size="small"
          type="search"
          sx={{ width: { xs: "100%", md: "400px" }, marginBottom: "15px" }}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden", // Prevent horizontal overflow
        }}
      >
        <TableContainer
          sx={{ overflowX: "auto", display: "block", whiteSpace: "nowrap" }}
        >
          <Table stickyHeader aria-label="responsive table">
            <DataTableHeader columns={columns} />
            <DataTableBody rows={rows} columns={columns} />
          </Table>
          <DataTablePaging totalRows={totalRows} />
        </TableContainer>
      </Box>
    </>
  );
};

export default DataTable;
