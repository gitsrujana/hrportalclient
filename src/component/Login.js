import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Popover,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider ";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpAnchorEl, setOtpAnchorEl] = useState(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/login",
        { email: data.email, password: data.password }
      );

      localStorage.setItem("loggedInEmail", data.email);
      const message = response.data.message;
      alert(message);
      login();
      navigate("/employeedashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(
        "Login Failed: " + (error.response?.data.message || "Error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

 
const handleSendOtp = async (data) => {
  const email = getValues("email");
  if (!email) {
    alert("Please enter your email to receive OTP.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/v1/api/employees/otp/send",
      { email }
    );


    if (response.status === 200 && response.data.success) {
      localStorage.setItem("loggedInEmail", email);
      alert(response.data.message || "OTP sent successfully!");
      setOtpSent(true);
      setOtpAnchorEl(true);
    } else {
      throw new Error(response.data.message || "Failed to send OTP");
    }
  } catch (error) {
    console.error("Send OTP Error:", error.response?.data || error.message);
    alert(
      "Failed to send OTP: " +
        (error.response?.data?.message || error.message || "Error occurred")
    );
  }
};


  const handleVerifyOtp = async () => {
    const email = getValues("email");
    if (!email || !otp) {
      alert("Please enter your email and OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/otp/verify",
        {
          email,
          otp,
        }
      );
      alert(response.data.message || "Login successful!");
      setOtpSent(false);
      setOtpAnchorEl(null);
      login();
      navigate("/employeedashboard");
    } catch (error) {
      console.error("Verify OTP Error:", error.response?.data || error.message);
      alert(
        "OTP Verification Failed: " +
          (error.response?.data.message || "Error occurred")
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginWithOtpClick = (event) => {
    setOtpAnchorEl(event.currentTarget);
    handleSendOtp();
  };

  const closeOtpPopover = () => {
    setOtpAnchorEl(null);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", padding: 2 }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            boxShadow: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" align="center" mb={2}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  sx={{ marginLeft: isMobile ? "-7%" : "-27%" }}
                />
              }
              label="You agree with Terms & Conditions"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: "#006666",
                "&:hover": {
                  background: "#006666",
                },
                textTransform: "none",
                mb: 2,
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
              sx={{ textTransform: "none", color: "black" }}
              fullWidth
              onClick={handleLoginWithOtpClick}
            >
              Login with OTP
            </Button>
          </form>

          <Popover
            open={Boolean(otpAnchorEl)}
            anchorEl={otpAnchorEl}
            onClose={closeOtpPopover}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Box p={2}>
              <Typography variant="body1">
                Enter OTP sent to your email
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleVerifyOtp}
                sx={{
                  background: "#006666",
                  "&:hover": {
                    background: "#006666",
                  },
                }}
              >
                Submit OTP
              </Button>
            </Box>
          </Popover>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;