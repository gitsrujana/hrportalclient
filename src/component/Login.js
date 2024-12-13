import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
  Link,
  Popover,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider ";

const Login = () => {
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [otpAnchorEl, setOtpAnchorEl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginWithOTPClick = (event) => {
    setOtpAnchorEl(event.currentTarget);
    handleSendOtp();
  };

  const otpOpen = Boolean(otpAnchorEl);

  const closeOtpPopover = () => {
    setOtpAnchorEl(null);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOTPLogin = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/otp/verify",
        { email, otp }
      );

      alert("OTP Login successful!");
      login();
      navigate("/employeedashboard");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error during OTP login:", err);
      alert("OTP Login failed! Please try again.");
    } finally {
      setLoading(false);
      closeOtpPopover();
    }
  };

  const handleLogin = async () => {
    let hasError = false;
    const newError = { email: "", password: "" };

    if (!email) {
      newError.email = "Email is required";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newError.email = "Enter a valid email";
      hasError = true;
    }

    if (!password) {
      newError.password = "Password is required";
      hasError = true;
    }

    if (!termsAccepted) {
      alert("You must agree to the terms and conditions");
      hasError = true;
    }

    setError(newError);

    if (!hasError) {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/v1/api/employees/login",
          { email, password }
        );

        alert("Login successful!");

        console.log("Response:", response.data);
        login();
        navigate("/employeedashboard");
      } catch (err) {
        console.error("Error during login:", err);
        alert("Login failed! Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/forgot-password",
        { email: forgotEmail }
      );

      alert("Password reset link sent!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error during password reset:", err);
      alert("Password reset failed! Please try again.");
    } finally {
      setLoading(false);
      setForgotPasswordMode(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/otp/send",
        { email }
      );

      alert("OTP sent to your email!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Failed to send OTP! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: isMobile ? "115vh" : isTablet ? "100%" : "100%",
        width: isMobile ? "100%" : isTablet ? "100%" : "100%",
        padding: isMobile || isTablet ? 2 : 4,
        backgroundImage:`url("https://wallpaper.dog/large/20559316.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: 54, 
        marginTop: isMobile ? "-740px" : isTablet ? "-600px" : "-600px",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: isMobile ? "center" : "left" }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1rem", md: "2.5rem" },
              fontWeight: 0,
              textAlign: isMobile ? "center" : "center",
              color: "white",
              marginTop: isMobile ? "1%" : isTablet ? "" : "0%",
              marginLeft: isMobile ? "0" : isTablet ? "" : "25%",
              letterSpacing: "0.2rem",
              textShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
              animation: "bounceIn 2s ease-in-out",
              "@keyframes bounceIn": {
                "0%": {
                  opacity: 0,
                  transform: "scale(0.5)",
                },
                "60%": {
                  opacity: 1,
                  transform: "scale(1.2)",
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
              "&:hover": {
                animation: "hoverBounce 1.5s ease-in-out",
              },
              "@keyframes hoverBounce": {
                "0%": {
                  transform: "scale(1)",
                },
                "30%": {
                  transform: "scale(1.2)",
                },
                "60%": {
                  transform: "scale(0.9)",
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
            }}
          >
            Welcome to <br /> Trie Tree Technology <br /> Pvt. Ltd
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: isMobile ? "100%" : 500,
              padding: isMobile ? 1 : 2,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              marginTop: "%",
              marginLeft: isMobile ? "0" : "25%",
              fontSize: { xs: "1rem", sm: "1rem", md: "2.5rem" },
              boxShadow: 54, 
            }}
          >
            <Typography sx={{ color: "black", textAlign: "center" }}>
              {forgotPasswordMode ? "Forgot Password" : "Login "}
            </Typography>

            {!forgotPasswordMode ? (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      mb: 1,
                      textAlign: "start",
                    }}
                  >
                    Email:
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter Email"
                    variant="outlined"
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error.email}
                    helperText={error.email}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      mb: 1,
                      textAlign: "start",
                    }}
                  >
                    Password:
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    variant="outlined"
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error.password}
                    helperText={error.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #00c853, #ff6f00)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #ff6f00, #00c853)",
                    },
                    textTransform: "none",
                    mb: 2,
                  }}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#007bff",
                    color: "#007bff",
                    textTransform: "none",
                    mb: 2,
                    "&:hover": { backgroundColor: "#e6f0ff" },
                  }}
                  onClick={handleLoginWithOTPClick}
                >
                  Login with OTP
                </Button>

                <Popover
                  open={otpOpen}
                  anchorEl={otpAnchorEl}
                  onClose={closeOtpPopover}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ p: 3, width: 300 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Enter OTP
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter OTP"
                      variant="outlined"
                      sx={{ mb: 2 }}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: "linear-gradient(135deg, #ff6f00, #00c853)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #ff6f00, #00c853)",
                        },
                      }}
                      onClick={handleOTPLogin}
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Submit OTP"}
                    </Button>
                  </Box>
                </Popover>

                <Link
                  component="button"
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    display: "block",
                    mt: 2,
                    color: "#007bff",
                  }}
                  onClick={() => setForgotPasswordMode(true)}
                >
                  Forgot Password?
                </Link>

                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ color: "black" }}
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  }
                  label={
                    <Typography sx={{ color: "black" }}>
                      You agree with Terms & Conditions
                    </Typography>
                  }
                />
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  sx={{ mt: 2 }}
                  onClick={() => setForgotPasswordMode(false)}
                >
                  Back to Login
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
