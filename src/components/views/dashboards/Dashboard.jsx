import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// MUI COMPONENTS
import { Box, Grid, Typography, styled } from "@mui/material";

// MUI ICONS
import {
  Assignment,
  AssignmentTurnedIn,
  AssignmentLate,
  AvTimer,
  Flag,
} from "@mui/icons-material";

// STYLED MUI COMPONENTS
const StyledBox = styled(Box)(({ theme }) => ({
  padding: "15px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

const DashboardBox = styled(Box)(({ theme }) => ({
  padding: "1em",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  height: "auto",
}));
// CHARTJS
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 12,
        },
        position: "bottom",
      },
    },
  };

  const data = {
    labels: ["Completed", "Pending", "Overdue", "Due Today"],
    datasets: [
      {
        label: "Total Number",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(77, 209, 192, 1)",
          "rgba(100, 149, 237, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: [
          "rgba(77, 209, 192, 1)",
          "rgba(100, 149, 237, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const line_data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Completed",
        data: [2, 1, 3, 1, 1, 2, 1],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  return (
    <Box mt={2} sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Grid container spacing={2}>
        {/* Dasboard top cards */}
        {/* <Grid size={{ xs: 12, sm: 2, md: 4 }}>
          <DashboardBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Total Task
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" sx={{ textAlign: "left", mt: "10px" }}>
                39
              </Typography>
              <Assignment
                sx={{ width: "10%", height: "10%" }}
                color="success"
              />
            </Box>
          </DashboardBox>
        </Grid> */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Completed
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" sx={{ textAlign: "left", mt: "10px" }}>
                12
              </Typography>
              <AssignmentTurnedIn
                sx={{ width: "10%", height: "10%" }}
                color="primary"
              />
            </Box>
          </DashboardBox>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Pending
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" sx={{ textAlign: "left", mt: "10px" }}>
                19
              </Typography>
              <AvTimer sx={{ width: "10%", height: "10%" }} color="info" />
            </Box>
          </DashboardBox>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Overdue
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" sx={{ textAlign: "left", mt: "10px" }}>
                3
              </Typography>
              <AssignmentLate
                sx={{ width: "10%", height: "10%" }}
                color="error"
              />
            </Box>
          </DashboardBox>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Due Today
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" sx={{ textAlign: "left", mt: "10px" }}>
                5
              </Typography>
              <Flag sx={{ width: "10%", height: "10%" }} color="warning" />
            </Box>
          </DashboardBox>
        </Grid>
        {/* Dashboard Grapds */}
        <Grid size={{ xs: 12, md: 8 }}>
          <StyledBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography component="h6" variant="h6" fontWeight={600}>
              Task Completion Chart
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: { xs: 2, md: 4 },
                width: { xs: "100%", md: "96%" },
                maxWidth: "100%",
                height: "100%",
                margin: "0 auto",
              }}
            >
              <Line options={options} data={line_data} />
            </Box>
          </StyledBox>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StyledBox
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <Typography component="h6" variant="h6" fontWeight={600}>
              Overall Todo List Progress
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: { xs: 2, md: 4 },
                width: { xs: "100%", md: "120%" },
                height: "100%",
                maxWidth: "100%",
                margin: "auto",
              }}
            >
              <Pie options={options} data={data} />
            </Box>
          </StyledBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
