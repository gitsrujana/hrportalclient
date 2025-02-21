import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider ";
import axios from "axios";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/logout",
        {},
        { withCredentials: true }
      );

      const message = response.data.message;
      alert(message);

      logout();
      navigate("/login");
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error occurred during logout");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fdf5e6",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <NavLink to="/homepage">
              <CardMedia
                component="img"
                src={assets.logo}
                sx={{ width: isMobile ? "60%" : "20%" }}
              />
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2}>
              {/* <NavLink to="/Addemployee">
                <Button
                  sx={{
                    textTransform: "none",
                    padding: "10px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    borderRadius: "50px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "lightgreen",
                      color: "white",
                    },
                  }}
                >
                  Signup
                </Button>
              </NavLink> */}

              {!isAuthenticated ? (
                <>
                  <NavLink to="/Login">
                    <Button
                      sx={{
                        textTransform: "none",
                        padding: "10px 24px",
                        fontSize: "14px",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        borderRadius: "50px",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "lightgreen",
                          color: "white",
                        },
                      }}
                    >
                      Signin
                    </Button>
                  </NavLink>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleLogout}
                    sx={{
                      textTransform: "none",
                      padding: "10px 24px",
                      fontSize: "14px",
                      fontWeight: "600",
                      letterSpacing: "1px",
                      borderRadius: "50px",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "lightgreen",
                        color: "white",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <CssBaseline />
    </>
  );
}

export default Navbar;
