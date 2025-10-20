import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

//MUI ICONS
import {
  Home,
  Assignment,
  DarkMode,
  Person,
  Work,
  Settings,
} from "@mui/icons-material";

// MUI COMPONENTS
import {
  Box,
  List,
  ListSubheader,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Switch,
  styled,
  Drawer,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

// MUI STYLED COMPONENTS
const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  backgroundColor: "transparent",
  fontWeight: "600",
  color: "#a4a4a4",
  display: "flex",
  alignItems: "center",
  gap: "1em",
  fontSize: "12px",
  marginTop: "1.5em",
  marginBottom: ".5em",
  paddingLeft: 0,
  borderBottom: "1px solid #a4a4a4",
  width: "90%",
  marginLeft: "5%",
  fontFamily: "Poppins",
}));

const drawerWidth = 200;

const Sidebar = ({ setOpen, open }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerContent = (
    <Box
      sx={{
        position: "relative",
        marginTop: { md: "4em" },
        width: "100%",
        height: "100%",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
      bgcolor={"background.default"}
      color={"text.primary"}
      flex={{ xs: 1, sm: 3, md: 2.2, lg: 1.6, xl: 1 }}
    >
      <Box sx={{ pl: "15px", mt: "10px", mb: 0, width: "100%" }}>
        <Typography component="h5" variant="h5" fontWeight={600}>
          Menu
        </Typography>
      </Box>
      <List sx={{ width: "100%" }}>
        {/* Dashboard */}
        <StyledListSubheader
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <Assignment sx={{ height: "18px", width: "18px" }} /> GENERAL
        </StyledListSubheader>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          onClick={(e) => setOpen(false)}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* Todo List */}
        <StyledListSubheader
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <Assignment sx={{ height: "18px", width: "18px" }} /> TODO LIST
        </StyledListSubheader>
        <ListItemButton
          component={NavLink}
          to="/todo-list/personal"
          onClick={(e) => setOpen(false)}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Personal" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/todo-list/work"
          onClick={(e) => setOpen(false)}
        >
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Work" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={(e) => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: theme.palette.background.default,
              height: "100%",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Permanent Drawer for desktop
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: theme.palette.background.default,
              height: "100vh",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
