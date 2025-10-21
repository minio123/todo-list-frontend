import { use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI components
import {
  Avatar,
  Container,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

// MUI icons
import { CameraAlt } from "@mui/icons-material";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.authUser);

  return (
    <Container
      sx={{
        padding: 0,
        maxWidth: { xs: "100%", md: "100%" },
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              mb: 2,
              display: { xs: "flex", md: "block" },
              gap: 2,
              alignItems: " center ",
            }}
          >
            <Box
              sx={{
                width: { xs: "50px", md: "250px" },
                height: { xs: "50px", md: "250px" },
                boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2) ",
                borderRadius: "50%",
                padding: "2px",
                position: "relative",
              }}
            >
              <Avatar
                alt={user.name}
                src={user.picture}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />
              {user.login_provider !== "google" && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "transparent",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    opacity: 0,
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.4)",
                      opacity: 1,
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <IconButton
                    component="label" // Change to label
                    sx={{
                      position: "absolute",
                      bottom: 30,
                      right: 0,
                      bgcolor: "background.paper",
                      boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2) ",
                      width: { xs: "30px", md: "50px" },
                      height: { xs: "30px", md: "50px" },
                      "&:hover": {
                        bgcolor: "background.paper",
                      },
                    }}
                  >
                    <CameraAlt />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file) {
                          console.log("Selected file:", file);
                        }
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.2rem", md: "2rem" },
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: ".9rem", md: "1rem" },
                }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
          {user.login_provider !== "google" && (
            <Button variant="outlined" component="label" fullWidth>
              Update Profile
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
