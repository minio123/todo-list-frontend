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
  Container,
  Paper,
} from "@mui/material";

// MUI icons
import {
  AssignmentOutlined,
  TaskAltOutlined,
  PendingActionsOutlined,
  EventBusyOutlined,
} from "@mui/icons-material";

const StatsCard = () => {
  const theme = useTheme();

  const cardStyle = {
    padding: 0,
    borderRadius: "8px",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "90px",
  };

  const cardIconStyle = {
    fontSize: "1.5rem",
  };

  const statsCardHeader = [
    {
      icon: <AssignmentOutlined sx={cardIconStyle} />,
      title: "Total",
      background:
        "linear-gradient(310deg, rgb(17, 113, 239), rgb(17, 205, 239));",
    },
    {
      icon: <TaskAltOutlined sx={cardIconStyle} />,
      title: "Completed",
      background:
        "linear-gradient(310deg, rgb(45, 206, 137), rgb(45, 206, 204))",
    },
    {
      icon: <PendingActionsOutlined sx={cardIconStyle} />,
      title: "Pending",
      background:
        "linear-gradient(310deg, rgb(251, 99, 64), rgb(251, 177, 64))",
    },
    {
      icon: <EventBusyOutlined sx={cardIconStyle} />,
      title: "Overdue",
      background: "linear-gradient(310deg, rgb(245, 54, 92), rgb(245, 96, 54))",
    },
  ];

  const statsCards = () => {
    const cards = statsCardHeader.map((card, i) => {
      return (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box
                variant="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="p"
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: "12px",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {10}
                  </Typography>
                </Box>

                <Typography
                  variant="span"
                  sx={{
                    background: card.background,
                    width: "40px",
                    height: "40px",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  {card.icon}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      );
    });

    return cards;
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {statsCards()}
    </Grid>
  );
};

export default StatsCard;
