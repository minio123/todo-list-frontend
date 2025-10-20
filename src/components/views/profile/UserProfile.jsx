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
} from "@mui/material";

const UserProfile = () => {
  const dispatch = useDispatch();

  return (
    <Container sx={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              mb: 2,
              display: { xs: "flex", md: "block" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Avatar
              alt={""}
              src={""}
              sx={{
                width: { xs: "50px", md: "250px" },
                height: { xs: "50px", md: "250px" },
                boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2) ",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.2rem", md: "2rem" },
                }}
              >
                John Doe
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: ".9rem", md: "1rem" },
                }}
              >
                johndoe@gmail.com
              </Typography>
            </Box>
          </Box>

          <Button variant="outlined" component="label" fullWidth>
            Change Profile Picture
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
