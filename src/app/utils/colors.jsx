// MUI ICONS
import {
  Check,
  AccessTime,
  Warning,
  NotificationsActive,
} from "@mui/icons-material";

// Status colors
const statusColors = Object.freeze({
  Done: "success",
  Pending: "warning",
  Overdue: "error",
  DueToday: "secondary",
});

// Status icons
const statusIcons = Object.freeze({
  Done: <Check />,
  Pending: <AccessTime />,
  Overdue: <Warning />,
  DueToday: <NotificationsActive />,
});

// Row Colors based on status
const rowColors = Object.freeze({
  Done: "#d4edda",
  Pending: "#fff3cd",
  Overdue: "#f8d7da",
  DueToday: "#f8dbfdff",
});

export { statusColors, statusIcons, rowColors };
