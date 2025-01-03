import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

const Checkindashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const loggedInEmail = localStorage.getItem("loggedInEmail");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/api/attendance/${loggedInEmail}`);
        const attendanceData = response.data;

        const startOfMonth = moment().startOf("month");
        const endOfMonth = moment().endOf("month");
        const daysInMonth = endOfMonth.diff(startOfMonth, "days") + 1;

        const today = moment().format("YYYY-MM-DD");
        const monthAttendance = [];

        for (let i = 0; i < daysInMonth; i++) {
          const date = startOfMonth.clone().add(i, "days").format("YYYY-MM-DD");
          const dayRecord = attendanceData.find((day) => day.date === date);

          const status = dayRecord
            ? dayRecord.status
            : date === today
            ? "Present"
            : "Absent";

          monthAttendance.push({ date, status });
        }

        setAttendance(monthAttendance);
        setTotalPresent(monthAttendance.filter((day) => day.status === "Present").length);
        setTotalDays(daysInMonth);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        alert("Failed to load attendance. Please try again.");
      }
    };

    fetchAttendance();
  }, [loggedInEmail]);

  return (
    <Box
      sx={{
        display: "flex",
       marginLeft:isMobile?"2%":"20%",
        minHeight:isMobile?"100vh": "100vh", 
        flexDirection: "column", 
        padding: isMobile ? "10px" : "20px", 
        marginTop: isMobile ? "0" : "10%", 
        width: isMobile ? "96%" : "60%", 
     
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h4"}
        gutterBottom
        sx={{
          fontSize: isMobile ? "15px" : "24px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#006666", 
          marginTop: isMobile ? "15%" : "0%", 
        }}
      >
        Attendance Dashboard
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          marginTop:isMobile?"10px": "20px",
          maxWidth: "100%",
          overflowX: "auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff", 
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#8e24aa", 
                  color: "white",
                }}
              >
                {isMobile ? "Date" : "Date (yyyy-mm-dd)"}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#8e24aa", 
                  color: "white",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((day) => (
              <TableRow key={day.date}>
                <TableCell
                  sx={{
                    backgroundColor:"#fff",
                    
                    color:   day.status === "Present" ? "black" : "black", 
                  }}
                >
                  {day.date}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor:"#fff",
                       
                    color:day.status === "Present" ? "green" : "black", 
                  }}
                >
                  {day.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: isMobile ? "5%" : "10px", textAlign: "center" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: isMobile ? "12px" : "16px",
                fontWeight: "bold",
                color: "#d32f2f", 
              }}
            >
              Total Days in Month: {totalDays}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: isMobile ? "12px" : "16px",
                fontWeight: "bold",
                color: "#388e3c", 
              }}
            >
              Total Present Days: {totalPresent}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Checkindashboard;
