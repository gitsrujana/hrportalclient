import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Modal,
  Container,
  IconButton
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import LeaveApplicationForm from "../LeaveApplicationForm "; 
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AccessTime,   CalendarToday } from "@mui/icons-material";


const EmployeeDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);

  const loggedInEmail = localStorage.getItem("loggedInEmail");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/api/employees/get");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees. Please try again.");
      }
    };
    fetchEmployees();

    const storedLoginTime = localStorage.getItem("loginTime");
    if (storedLoginTime) {
      const loginDate = new Date(storedLoginTime);
      setLoginTime(loginDate);
    }

    const storedLogoutTime = localStorage.getItem("logoutTime");
    if (storedLogoutTime) {
      const logoutDate = new Date(storedLogoutTime);
      setLogoutTime(logoutDate);
      calculateWorkingHours(new Date(storedLoginTime), logoutDate);
    }
  }, []);

  const calculateWorkingHours = (login, logout) => {
    const timeDifference = logout - login; 
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)); 
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); 
    setWorkingHours(`${hours} hours ${minutes} minutes`);
  };

  const currentEmployee = employees.find((employee) => employee.email === loggedInEmail);

  const handleOpenLeaveModal = () => {
    setLeaveModalOpen(true);
  };

  const handleCloseLeaveModal = () => {
    setLeaveModalOpen(false);
  };

  
  return (
    <Box sx={{ display: "flex", height: "100vh", boxShadow: 54, marginTop: "8%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Header
          currentEmployee={currentEmployee}
          loginTime={loginTime}
          logoutTime={logoutTime}
          workingHours={workingHours}
        />
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <ClockWithCalendar />
            </Grid>
            
            <Grid item xs={12}>
            <Button
  variant="contained"
  onClick={handleOpenLeaveModal}
  sx={{
    width: "20%",
    marginTop:"-13%",
    padding: "12px 20px",
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#ffffff", 
    backgroundColor: "#006666",
    borderRadius: 8, 
    boxShadow: "0px 4px 12px #004d4d", 
    transition: "all 0.3s ease", 
    "&:hover": {
      backgroundColor: "#004d4d",
      boxShadow: "0px 6px 16px rgba(0, 77, 77, 0.8)", 
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.97)", 
    },
  }}
>
  Apply for Leave
         </Button>


            </Grid>
          </Grid>
        </Container>

        <Modal open={leaveModalOpen} onClose={handleCloseLeaveModal}>
          <Box
            sx={{
              position: "absolute",
              marginTop: "28%",
              marginLeft: "70%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              maxWidth: 600,
              width: "100%",
              height: "100vh",
            }}
          >
            <LeaveApplicationForm onClose={handleCloseLeaveModal} />
          </Box>
        </Modal>

       
      </Box>
    </Box>
  );
};

const Header = ({ currentEmployee, loginTime, logoutTime, workingHours }) => {
  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 3,
  
    
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontSize: "2rem",
        fontWeight: 700,
        color: "#006666", 
        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)", 
        marginLeft:"10%"
      }}
    >
      👋 Welcome, {currentEmployee?.name || "Employee"}
    </Typography>
  
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        borderRadius: 3,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
        textAlign:"start",
        marginRight:"10%"
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#ff5722", // Bright orange for labels
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        🔓 Last Login: {loginTime ? loginTime.toLocaleString() : "N/A"}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#3f51b5", 
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        🔒 Last Logout: {logoutTime ? logoutTime.toLocaleString() : "N/A"}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#4caf50", 
          fontWeight: 600,
        }}
      >
        ⏱️ Working Hours: {workingHours || "N/A"}
      </Typography>
    </Box>
  </Box>
  
  
  );
};

const ClockWithCalendar = () => {
  const [time, setTime] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const handleCalendarOpen = () => {
    setIsCalendarOpen(true);
  };
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 2,
        borderRadius: 1,
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        marginLeft:"20%"
      }}
    >
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
        <AccessTime sx={{ verticalAlign: "middle", mr: 1 }} />
        {time.toLocaleTimeString()}
      </Typography>
      <IconButton color="primary" onClick={handleCalendarOpen} sx={{ ml: 2 }}>
        <CalendarToday />
      </IconButton>
      <Modal open={isCalendarOpen} onClose={handleCalendarClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Calendar
          </Typography>
          <Calendar value={time} />
        </Box>
      </Modal>
    </Box>
  );
};


export default EmployeeDashboard;