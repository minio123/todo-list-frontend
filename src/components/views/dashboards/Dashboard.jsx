import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// MUI COMPONENTS
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";

import StatsCard from "./StatsCard.jsx";
import Charts from "./Charts.jsx";

// // STYLED MUI COMPONENTS
// const StyledBox = styled(Box)(({ theme }) => ({
//   padding: "15px",
//   borderRadius: "8px",
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// }));

// CHARTJS
const Dashboard = () => {
  const theme = useTheme();

  const chartStyle = {
    padding: { sm: "0", md: "2em 0" },
    borderRadius: "8px",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: 500,
    marginTop: "2em",
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid item size={12}>
        <Box
          mt={2}
          sx={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <StatsCard />
        </Box>
      </Grid>
      <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
        <Card sx={chartStyle}>
          <Charts />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
