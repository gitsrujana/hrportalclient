import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, Backdrop, Fade } from "@mui/material";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [openPopover, setOpenPopover] = useState(true);
  const [checkintime, setCheckintime] = useState(null);
  const [checkouttime, setCheckouttime] = useState(null);
  const [workinghours, setWorkinghours] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const loggedInEmail = localStorage.getItem("loggedInEmail");

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

  const handleCheckIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/api/attendance/checkin",
        {
          email: loggedInEmail,
        }
      );

      const checkinDate = moment(response.data.checkintime).toDate();

      if (moment(checkinDate).isValid()) {
        setCheckintime(checkinDate);
        setCheckedIn(true);
        setOpenPopover(false);
      } else {
        throw new Error("Invalid date returned by the server");
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      alert("Failed to check in. Please try again.");
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/api/attendance/checkout",
        {
          email: loggedInEmail,
        }
      );

      const checkoutDate = moment(response.data.checkouttime).toDate();
      if (moment(checkoutDate).isValid()) {
        setCheckouttime(checkoutDate);
        setCheckedIn(false);

        const checkinMoment = moment(checkintime);
        const checkoutMoment = moment(checkoutDate);
        const hoursWorked = checkoutMoment.diff(checkinMoment, "hours", true);

        setWorkinghours(hoursWorked.toFixed(2));
      } else {
        throw new Error("Invalid date returned by the server");
      }
    } catch (error) {
      console.error("Error during check-out:", error);
      alert("Failed to check out. Please try again.");
    }
  };

  const currentEmployee = employees.find(
    (employee) => employee.email === loggedInEmail
  );

  return (
    <>
      <Modal
        open={openPopover}
        onClose={() => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPopover}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                color: "#ff5722",
                fontWeight: 300,
                fontSize: { xs: "18px", sm: "21px" },
                textAlign: "center",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.15)",
              }}
            >
              Welcome! Please check in for today
            </Typography>
            <Button
              variant="contained"
              onClick={handleCheckIn}
              sx={{
                backgroundColor: "#006666",
                color: "#fff",
                fontWeight: 600,
                padding: "12px 28px",
                borderRadius: "50px",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#006666",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  backgroundColor: "#006666",
                  transform: "translateY(1px)",
                },
              }}
            >
              Check In
            </Button>
          </Box>
        </Fade>
      </Modal>

      {!openPopover && (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            boxShadow: 54,
            marginTop: { xs: "5%", sm: "15%" },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Header
              currentEmployee={currentEmployee}
              checkintime={checkintime}
              checkouttime={checkouttime}
              workinghours={workinghours}
              handleCheckOut={handleCheckOut}
              checkedIn={checkedIn}
            />
            <NavLink to="/checkindashboard">
              <Button
                sx={{
                  marginTop: 2,
                  marginLeft: { xs: "2%", sm: "30%", md: "50%", lg: "60%" },
                  backgroundColor: "#006666",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: "#006666" },
                }}
              >
                Attendance
              </Button>
            </NavLink>
          </Box>
        </Box>
      )}
    </>
  );
};

const Header = ({
  currentEmployee,
  checkintime,
  checkouttime,
  workinghours,
  handleCheckOut,
  checkedIn,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          fontWeight: 700,
          color: "#006666",
          textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)",
          textAlign: { xs: "left", sm: "center" },
          marginTop: { xs: "15%", sm: "1%" },
        }}
      >
        👋 Welcome, {currentEmployee?.name || "Employee"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 3,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "start",
          marginRight: { xs: "5%", sm: "10%" },
          mt: { xs: 2, sm: 0 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#ff5722",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          🔓 Check-in Time:{" "}
          {checkintime ? checkintime.toLocaleTimeString() : "N/A"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#3f51b5",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          🔒 Check-out Time:{" "}
          {checkouttime ? checkouttime.toLocaleTimeString() : "N/A"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#4caf50",
            fontWeight: 600,
          }}
        >
          ⏱ Working Hours: {workinghours || "N/A"}
        </Typography>

        {checkedIn && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckOut}
            sx={{ marginTop: "1rem" }}
          >
            Check Out
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
