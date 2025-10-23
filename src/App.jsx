import { useEffect, useState } from "react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Custom provider
import DialogProvider from "./components/shared/dialog/DialogProvider";

// Navbar and Sidebar Components
import Navbar from "./components/template/Navbar.jsx";
import Sidebar from "./components/template/Sidebar.jsx";

import { useDispatch, useSelector } from "react-redux";

// Components
import Login from "./components/views/auth/Login.jsx";

// snackMessage component
import SnackMessage from "./app/utils/snackMessage.jsx";

// MUI Components
import {
  Box,
  Fab,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

//MUI Icons
import { DarkMode, LightMode } from "@mui/icons-material";

// API
import api from "./app/config/api.js";

// Redux actions
import { loggedUser } from "./app/slices/authSlice.js";

function App() {
  // Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const locate = location.pathname.split("/");

  const { isLoggedIn } = useSelector((state) => state.authUser);

  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);
  const darkTheme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
      // fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
      fontSize: 11, // Default font size
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light mode colors
            primary: { main: "#1976d2" },
            secondary: { main: "#9c27b0" },
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
              floating: "#1e1e20",
            },
            text: {
              primary: "#333333",
              secondary: "#333333",
              dark: "#ececf1",
            },
          }
        : {
            // Dark mode colors
            primary: { main: "#90caf9" },
            secondary: { main: "#f48fb1" },
            background: {
              default: "#1e1e20",
              paper: "#2a2a2e",
              card: "#1e1e20",
            },
            text: {
              primary: "#ececf1",
              secondary: "#aaaaaa",
            },
          }),
    },
  });

  const checkToken = () => {
    const response = api
      .post("auth/refresh")
      .then((res) => {
        dispatch(loggedUser(res.data.user));
      })
      .catch((err) => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      });
    return response;
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      {localStorage.getItem("isLoggedIn") ? (
        <ThemeProvider theme={darkTheme}>
          <DialogProvider>
            <Box
              bgcolor={"background.paper"}
              color={"text.primary"}
              sx={{ position: "relative", minHeight: "100vh" }}
            >
              <Navbar setOpen={setOpen} open={open} />
              <Box
                spacing={{ xs: 0, md: 2 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1em",
                }}
              >
                <Sidebar setOpen={setOpen} open={open} />
                <Box
                  sx={{
                    pr: { xs: "0", md: "1em" },
                    pl: { xs: "0", md: "0" },
                    width: { xs: "100%", md: "65%" },
                  }}
                >
                  <Box
                    sx={{
                      padding: { xs: "1em", md: "2em" },
                      marginTop: { xs: "0", md: "2em" },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box mb={2}>
                        <Typography
                          variant="h5"
                          gutterBottom
                          component="div"
                          sx={{ flexGrow: 1, fontWeight: "600", padding: 1 }}
                          textTransform={"uppercase"}
                        >
                          {locate.join(" > ")}
                        </Typography>
                      </Box>
                      {location.pathname === "/dashboard" ? (
                        <Outlet />
                      ) : (
                        <Box
                          sx={{
                            padding: { xs: "1em", md: "2em" },
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: 1,
                            mb: 2,
                            borderRadius: "15px",
                            bgcolor: darkTheme.palette.background.default,
                          }}
                        >
                          <Outlet />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Fab
                sx={{
                  position: "fixed",
                  right: { xs: "2%", md: "3%" },
                  bottom: { xs: "3%", md: "5%" },
                  bgcolor: mode == "light" ? "#2a2a2e" : "#ffffff",
                  color: mode == "light" ? "#ffffff" : "#2a2a2e",
                  opacity: 0.2,
                  width: { xs: "50px", md: "70px" },
                  height: { xs: "50px", md: "70px" },
                  "&:hover": {
                    bgcolor: mode == "light" ? "#1e1e20" : "#a5a5a5",
                    opacity: 1,
                    transition: "all 0.3s ease-in-out",
                  },
                }}
                onClick={(e) => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode == "light" ? <DarkMode /> : <LightMode />}
              </Fab>
            </Box>
            <SnackMessage />
          </DialogProvider>
        </ThemeProvider>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
