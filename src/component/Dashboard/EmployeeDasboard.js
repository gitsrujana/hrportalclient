import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Modal,
  Container,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { AccessTime, Logout, ArrowDropDown, CalendarToday } from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import LeaveApplicationForm from "../LeaveApplicationForm ";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
 const [employees, setEmployees] = useState([]);
  const handleOpenLeaveModal = () => {
    setLeaveModalOpen(true);
  };

  const handleCloseLeaveModal = () => {
    setLeaveModalOpen(false);
  };


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/api/employees/get"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees. Please try again.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" ,
    
      backgroundImage:`url("https://wallpaper.dog/large/20559316.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: 54, 
      marginTop: isMobile ? "-740px" : isTablet ? "-600px" : "-610px",

    }}>
      <Box sx={{ flexGrow: 1,  }}>
        <Header employees={employees}/>
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <ClockWithCalendar />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BreakDropdown />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleOpenLeaveModal}
                sx={{ width: "20%", p: 1,textTransform:"none" }}
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
              marginTop:"28%",
              marginLeft:"70%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              maxWidth: 600,
              width: "100%",
              height:"100vh"
            }}
          >
            <LeaveApplicationForm onClose={handleCloseLeaveModal} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

const Header = ({employees}) => (


  
  <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
       {employees.map((employee) => (
    <Typography variant="h6" sx={{ml:30, fontSize: "1.5rem", fontWeight: "bold" ,color:"white"}}>
      Welcome,{employee.name}

    </Typography>
       ))}
    <Typography variant="body2" sx={{ ml: 5,color:"white" }}>
      Last Login: [Date & Time]
    </Typography>
  </Box>
);

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

const BreakDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBreak, setSelectedBreak] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (breakType) => {
    if (breakType) setSelectedBreak(breakType);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: "white", p: 2, borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Breaks
      </Typography>
      <Button
        variant="contained"
        endIcon={<ArrowDropDown />}
        onClick={handleMenuOpen}
        fullWidth
      >
        {selectedBreak || "Select Break"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(null)}
      >
        <MenuItem onClick={() => handleMenuClose("Tea Break")}>Tea Break</MenuItem>
        <MenuItem onClick={() => handleMenuClose("Lunch Break")}>Lunch Break</MenuItem>
        <MenuItem onClick={() => handleMenuClose("Back to Work")}>Back to Work</MenuItem>
      </Menu>
    </Box>
  );
};

export default Homepage;