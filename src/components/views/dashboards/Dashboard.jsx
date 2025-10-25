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
  return (
    <Box mt={2} sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <StatsCard />
    </Box>
  );
};

export default Dashboard;
