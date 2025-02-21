import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Typography,
  useMediaQuery,
  IconButton,
  TextField,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import EmployeeAttendanceDetails from "./EmployeeAttendanceDetails ";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const nationalHolidays = [
  { date: new Date(2025, 0, 1), name: "New Year's Day" },
  { date: new Date(2025, 6, 4), name: "Independence Day" },
  { date: new Date(2025, 11, 25), name: "Christmas Day" },
];

const AttendanceTable = () => {
  const theme = useTheme();
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/v1/api/attendance/get`
        );
        setAttendanceData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleEmployeeEmailClick = (email) => {
    setSelectedEmployeeEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmployeeEmail(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setMessage(""); // Reset message initially
  
    if (date) {
      const day = date.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)
      const formattedDate = date.toDateString(); // Convert date to string for comparison
  
      const isHoliday = nationalHolidays.find(
        (holiday) => holiday.date.toDateString() === formattedDate
      );
  
      if (day === 0) {
        setMessage("Today is Sunday, it's a weekend!");
      } else if (day === 6) {
        setMessage("Today is Saturday, it's a weekend!");
      } else if (isHoliday) {
        setMessage(`Today is a national holiday: ${isHoliday.name}`);
      }
  
      // Filter attendance data based on selected date
      const filtered = attendanceData.filter((attendance) => {
        const attendanceDate = new Date(attendance.date);
        return attendanceDate.toDateString() === formattedDate;
      });
  
      setFilteredData(filtered);
  
      // If no records exist for the date, show a message
      if (filtered.length === 0) {
        setMessage((prevMessage) =>
          prevMessage ? prevMessage + " No attendance records found." : "No records found for the selected date."
        );
      }
    } else {
      setFilteredData(attendanceData); // Reset filter if no date is selected
    }
  };
  

  return (
    <>
      <Sidebar />

      <Box
        sx={{
          p: isMobile ? 0 : 3,
          mt: isMobile ? "-550px" : "-36%",
          width: isMobile ? "95%" : "80%",
          height: isMobile ? "auto" : "auto",
          ml: isMobile ? "2%" : "18%",
          marginTop: "1%",
        }}
      >
        <Typography
          sx={{
            backgroundColor: "#006666",
            color: "#fff",
            padding: "16px",
            textAlign: "center",
            borderRadius: "8px 8px 0 0",
            marginTop: "5%",
            fontSize: isMobile ? "14px" : "18px",
          }}
        >
          Employee Attendance
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker label="Select Date" value={selectedDate} onChange={handleDateChange} renderInput={(params) => <TextField {...params} sx={{ marginTop: "1%", marginLeft: "50%" }} />} />
        </LocalizationProvider>
        {message && <Alert severity="info" sx={{ marginTop: "1%",color:"red" }}>{message}</Alert>}

        <TableContainer
          component={Paper}
          style={{ marginTop: isMobile ? "0%" : "20px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="attendance table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Check-in Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Check-out Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Working Hours</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((attendance) => (
                <TableRow key={`${attendance.email}-${attendance.date}`}>
                  <TableCell
                    onClick={() => handleEmployeeEmailClick(attendance.email)}
                  >
                    {attendance.email}
                  </TableCell>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>
                    {attendance.checkintime
                      ? new Date(attendance.checkintime).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {attendance.checkouttime
                      ? new Date(attendance.checkouttime).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {attendance.workinghours
                      ? attendance.workinghours.toFixed(2)
                      : "-"}
                  </TableCell>
                  <TableCell>{attendance.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedEmployeeEmail && (
          <EmployeeAttendanceDetails
            email={selectedEmployeeEmail}
            attendanceData={attendanceData}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </>
  );
};

export default AttendanceTable;