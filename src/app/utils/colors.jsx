// MUI ICONS
import {
  Check,
  AccessTime,
  Warning,
  NotificationsActive,
} from "@mui/icons-material";

// Status colors
const statusColors = {
  Done: "success",
  Pending: "warning",
  Overdue: "error",
  DueToday: "secondary",
};

// Status icons
const statusIcons = {
  Done: <Check />,
  Pending: <AccessTime />,
  Overdue: <Warning />,
  DueToday: <NotificationsActive />,
};

// Row Colors based on status
const rowColors = {
  Done: "#d4edda",
  Pending: "#fff3cd",
  Overdue: "#f8d7da",
  DueToday: "#f8dbfdff",
};

export { statusColors, statusIcons, rowColors };
