import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper, Typography, useMediaQuery, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Sidebar from './Sidebar';
import EmployeeAttendanceDetails from './EmployeeAttendanceDetails ';

const AttendanceTable = () => {
  const theme = useTheme();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState(null);
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/api/attendance/get`);
        setAttendanceData(response.data);
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

  return (
    <>
      <Sidebar />
      <Box sx={{
        p: isMobile ? 0 : 3,
        mt: isMobile ? "-550px" : "-36%",
        width: isMobile ? "95%" : "80%",
        height: isMobile ? 'auto' : 'auto',
        ml: isMobile ? "2%" : "18%",
        marginTop: "1%",
      }}>
        <Typography sx={{
          backgroundColor: "#006666",
          color: "#fff",
          padding: "16px",
          textAlign: "center",
          borderRadius: "8px 8px 0 0",
          marginTop: "5%",
          fontSize: isMobile ? "14px" : "18px"
        }}>Employee Attendance</Typography>

        <TableContainer component={Paper} style={{ marginTop: isMobile ? "0%" : '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="attendance table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Check-in Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Check-out Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Working Hours</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((attendance) => (
                <TableRow key={`${attendance.email}-${attendance.date}`}>
                  <TableCell onClick={() => handleEmployeeEmailClick(attendance.email)}>
                    {attendance.email}
                  </TableCell>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>{attendance.checkintime ? new Date(attendance.checkintime).toLocaleString() : '-'}</TableCell>
                  <TableCell>{attendance.checkouttime ? new Date(attendance.checkouttime).toLocaleString() : '-'}</TableCell>
                  <TableCell>{attendance.workinghours ? attendance.workinghours.toFixed(2) : '-'}</TableCell>
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
