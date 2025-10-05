import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { googleLogout } from "@react-oauth/google";

// Actions
import { logoutUser } from "../../app/slices/authSlice";

// api
import api from "../../app/config/api";

// Redux slices
import { showMessage } from "../../app/slices/snackMessageSlice";

// middleware->actions

// MUI COMPONENTS
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
} from "@mui/material";

// MUI ICONS
import { Menu as MenuIcon } from "@mui/icons-material";

const Navbar = ({ setOpen, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const { user, isLoggedIn } = useSelector((state) => state.authUser);

  // local state
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  // theme
  const theme = useTheme();

  // logout function
  const logout = async () => {
    const res = await api.post("/auth/logout");
    const responseStatus = res.data;
    if (responseStatus.status === "success") {
      showMessage({
        open: true,
        severity: "success",
        message: responseStatus.message,
      });

      dispatch(logoutUser());
      googleLogout();
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
      setOpen(false);
    } else {
      showMessage({
        open: true,
        severity: "warning",
        message: responseStatus.message,
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setName(user.name);
      setPicture(user.picture);
    }
  }, [isLoggedIn, localStorage.getItem("isLoggedIn"), navigate]);

  return (
    <AppBar
      sx={{
        [theme.breakpoints.up("md")]: {
          zIndex: theme.zIndex.drawer + 1,
        },
        position: "sticky",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component="p"
          sx={{
            fontWeight: "600",
            display: { xs: "none", md: "block" },
          }}
        >
          TODO LIST {open}
        </Typography>
        <MenuIcon
          color="action"
          onClick={(e) => setOpen(!open)}
          sx={{
            fontSize: "2rem",
            display: { xs: "block", md: "none" },
            cursor: "pointer",
            ml: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setToggle(true);
          }}
        >
          <Typography>{name}</Typography>
          <IconButton>
            <Avatar
              alt={name}
              src={picture}
              sx={{
                width: { xs: 35, md: 40 },
                height: { xs: 35, md: 40 },
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            />
          </IconButton>
        </Box>
        <Menu
          id="basic-menu"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: { xs: "40px", md: "48px" } }}
          onClose={(e) => setToggle(false)}
          open={toggle}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem onClick={(e) => setToggle(false)}>My Account</MenuItem>
          <MenuItem onClick={(e) => logout()}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
