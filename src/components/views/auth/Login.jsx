import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import api from "../../../app/config/api.js";

// Google auth
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
// MUI Components
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Logo
import logo from "../../../assets/logo/TodoListLogo.png";
import googleLogo from "../../../assets/logo/google.png";

// Redux slices
import { showMessage } from "../../../app/slices/snackMessageSlice";
import { loggedUser } from "../../../app/slices/authSlice.js";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { isLoggedIn, response } = useSelector((state) => state.authUser);
  const { response: snackResponse } = useSelector(
    (state) => state.snackMessage
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      try {
        // Send the auth code to your backend
        const res = await api.post("/auth/google/callback", {
          code: response.code,
        });

        const responseStatus = res.data;
        const responseData = res.data.user;
        if (responseStatus.status === "success") {
          const userInfo = {
            email: responseData.email,
            name: responseData.name,
            picture: responseData.picture,
          };

          dispatch(loggedUser(userInfo));
          localStorage.setItem("isLoggedIn", true);
          navigate("/dashboard");
        } else {
          setErrorLogin(responseStatus.message);
        }
      } catch (error) {
        console.error("Error sending code to backend:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const defaultLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
        rememberMe: rememberMe,
      });

      const responseStatus = res.data;
      const responseData = res.data.user;
      if (responseStatus.status === "success") {
        const userInfo = {
          email: responseData.email,
          name: responseData.name,
          picture: responseData.picture,
        };

        dispatch(loggedUser(userInfo));
        localStorage.setItem("isLoggedIn", true);
        navigate("/dashboard");
      } else {
        setErrorLogin("Incorrect email or password");
      }
    } catch (error) {
      setErrorLogin("Incorrect email or password");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // useEffect for the setting value of the states for edit
      if (snackResponse && snackResponse.status && snackResponse.message) {
        dispatch(
          showMessage({
            open: true,
            severity: response.status,
            message: response.message,
          })
        );
      }
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, dispatch, response]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "rgba(245, 245, 245, 0.5)",
      }}
    >
      <Card
        sx={{
          borderRadius: 0,
          width: "400px",
          height: "600px",
          padding: "1em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 60,
            }}
          />

          <Typography variant="h4" sx={{ fontWeight: 500, color: "#333333" }}>
            Sign in
          </Typography>

          <Box
            sx={{
              marginTop: "2em",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Typography
              variant="p"
              sx={{
                marginTop: "-1em",
                color: "red",
                fontSize: "14px",
              }}
            >
              {errorLogin}
            </Typography>

            <Link
              href="#"
              underline="hover"
              sx={{
                marginTop: "-1em",
                color: "#333333",
                fontSize: "14px",
              }}
            >
              Forgot password?
            </Link>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "50px" }}
              onClick={() => defaultLogin()}
            >
              Login Sign in
            </Button>

            {/* Google Sign-In */}
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                onClick={() => googleLogin()} // trigger the Google login popup
                variant="outlined"
                fullWidth
                startIcon={<img src={googleLogo} alt="Google" width={20} />}
                sx={{
                  width: "100%",
                  fontWeight: 500,
                  height: "50px",
                  color: "#333333",
                  border: "1px solid #333333",
                  "&:hover": {
                    backgroundColor: "#333333",
                    color: "#ffffff",
                  },
                }}
              >
                Sign in with Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
