import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
  IconButton,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useNavigate } from "react-router-dom";

import "react-calendar/dist/Calendar.css";

import Sidebar from "./Sidebar";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/Admin");
  };

  return (
    <>
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10%",
          marginLeft: isMobile ? "1%" : "10%",
        }}
      >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginLeft:isMobile?"70%":"80%",marginTop:isMobile?"-25%":"-5%",textTransform:"none" }}
            >
              Logout
            </Button>
        <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
          <Grid item xs={12} sm={6} md={12}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "24px", sm: "32px", md: "40px" },
                fontWeight: "bold",
                letterSpacing: "2px",
                color: "orangered",
                marginTop: { xs: "5%", sm: "5%", md: "2%" },
              }}
            >
              Welcome to Admin Dashboard
            </Typography>
        
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: isMobile ? "90%" : "100%",
                marginLeft: isMobile ? "4%" : "0%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "16px",
                boxShadow: theme.shadows[5],
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleNavigation("/employeemanagement")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <IconButton>
                  <PeopleIcon fontSize="large" color="primary" />
                </IconButton>
                <Typography variant="h6">Employee Management</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: isMobile ? "90%" : "100%",
                marginLeft: isMobile ? "4%" : "0%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "16px",
                boxShadow: theme.shadows[5],
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleNavigation("/attendance")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <IconButton>
                  <AccessTimeIcon fontSize="large" color="primary" />
                </IconButton>
                <Typography variant="h6">Attendance Management</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;