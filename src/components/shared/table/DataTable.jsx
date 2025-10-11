import { useMemo } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

// MUI components
import { useMediaQuery, useTheme, Table, TextField, Box } from "@mui/material";

// Custom datatable components
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";

// Redux actions
import { search, setLoad } from "../../../app/slices/dataTableSlice";

const DataTable = ({ columns, rows }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
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
      <Box sx={{ width: isMdUp ? "auto" : "100%" }}>
        <TextField
          id="outlined-search"
          label="Search field"
          size="small"
          type="search"
          sx={{ width: isMdUp ? "400px" : "100%", marginBottom: "15px" }}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
      </Box>
      <Table stickyHeader aria-label="sticky table">
        <DataTableHeader columns={columns} />
        <DataTableBody rows={rows} columns={columns} />
      </Table>
    </>
  );
};

export default DataTable;
