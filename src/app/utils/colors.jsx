// MUI ICONS
import {
  Check,
  AccessTime,
  Warning,
  NotificationsActive,
} from "@mui/icons-material";

// Status colors
const statusColors = Object.freeze({
  done: "success",
  pending: "warning",
  overdue: "error",
  dueToday: "secondary",
});

// Status icons
const statusIcons = Object.freeze({
  done: <Check />,
  pending: <AccessTime />,
  overdue: <Warning />,
  dueToday: <NotificationsActive />,
});

// Row Colors based on status
const rowColors = Object.freeze({
  done: "#d4edda",
  pending: "#fff3cd",
  overdue: "#f8d7da",
  dueToday: "#f8dbfdff",
});

export { statusColors, statusIcons, rowColors };
