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
  Modal,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";

const Checkindashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [clickedEmail, setClickedEmail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeAttendance, setEmployeeAttendance] = useState([]);

  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const daysPresent = employeeAttendance.filter(
    (att) => att.status === "Present"
  ).length;

  const fetchEmployeeAttendance = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/api/attendance/${email}`
      );
      const attendanceData = response.data;
      setEmployeeAttendance(attendanceData);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching employee attendance:", error);
      alert("Failed to load employee attendance. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/v1/api/attendance/${loggedInEmail}`
        );
        const attendanceData = response.data;

        const startOfMonth = moment().startOf("month");
        const today = moment();

        const attendanceMap = new Map(
          attendanceData.map((day) => [
            moment(day.date).format("YYYY-MM-DD"),
            day,
          ])
        );

        let presentCount = 0;
        const completeAttendanceList = [];

        for (
          let m = moment(startOfMonth);
          m.isSameOrBefore(today);
          m.add(1, "day")
        ) {
          const dateStr = m.format("YYYY-MM-DD");

          if (attendanceMap.has(dateStr)) {
            const day = attendanceMap.get(dateStr);
            if (day.status === "Present") presentCount++;
            completeAttendanceList.push(day);
          } else {
            completeAttendanceList.push({
              date: dateStr,
              email: loggedInEmail,
              status: "Absent",
              checkintime: null,
              checkouttime: null,
            });
          }
        }

        setAttendance(completeAttendanceList);
        setTotalPresent(presentCount);
        setTotalDays(completeAttendanceList.length);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        alert("Failed to load attendance. Please try again.");
      }
    };

    fetchAttendance();
  }, [loggedInEmail]);

  const handleEmailClick = (email) => {
    setClickedEmail(email);
    fetchEmployeeAttendance(email);
  };

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "20px",
        width: isMobile ? "96%" : "60%",
        margin: "auto",
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h4"}
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#006666",
          marginTop: "12%",
        }}
      >
        Attendance Dashboard
      </Typography>

      <Typography
        sx={{
          fontSize: isMobile ? "12px" : "16px",
          fontWeight: "bold",
          color: "#333",
          marginLeft: isMobile ? "0" : "20px",
        }}
      >
        Email:{" "}
        <span
          onClick={() => handleEmailClick(loggedInEmail)}
          style={{ color: "#8e24aa", cursor: "pointer" }}
        >
          {loggedInEmail}
        </span>
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
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
                Date
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
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#8e24aa",
                  color: "white",
                }}
              >
                Check-in Time
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#8e24aa",
                  color: "white",
                }}
              >
                Check-out Time
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#8e24aa",
                  color: "white",
                }}
              >
                Work Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((day) => {
              const checkinMoment = day.checkintime
                ? moment(day.checkintime)
                : null;
              const checkoutMoment = day.checkouttime
                ? moment(day.checkouttime)
                : null;
              const workingHours =
                checkinMoment && checkoutMoment
                  ? checkoutMoment.diff(checkinMoment, "hours", true).toFixed(2)
                  : "-";

              return (
                <TableRow key={day.date}>
                  <TableCell>{day.date}</TableCell>
                  <TableCell
                    sx={{ color: day.status === "Present" ? "green" : "red" }}
                  >
                    {day.status}
                  </TableCell>
                  <TableCell>
                    {day.checkintime
                      ? moment(day.checkintime).format("HH:mm:ss")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {day.checkouttime
                      ? moment(day.checkouttime).format("HH:mm:ss")
                      : "-"}
                  </TableCell>
                  <TableCell>{workingHours}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: isMobile ? "14px" : "16px",
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
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "bold",
                color: "#388e3c",
              }}
            >
              Total Present Days: {totalPresent}
            </Typography>
          </Grid>
        </Grid>
      </Box>

  
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: isMobile ? 2 : 4,
            borderRadius: "8px",
            boxShadow: 24,
            width: { xs: "90%", sm: "80%", md: "50%" },
            overflowY: isMobile ? "scroll" : "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CloseIcon
            onClick={() => setModalOpen(false)}
            sx={{
              color: "#000",
              marginLeft: "100%",
              color: "red",
              cursor: "pointer",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              flex: 1,
              textAlign: "center",
              backgroundColor: "#006666",
              color: "#fff",
              padding: "16px",
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
              marginTop: isMobile ? "-5%" : "0%",
              fontSize: isMobile ? "13px" : "18px",
            }}
          >
            Attendance for {clickedEmail}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}> Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Check-in Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Check-out Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Working Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeAttendance.map((day) => {
                const checkinMoment = day.checkintime
                  ? moment(day.checkintime)
                  : null;
                const checkoutMoment = day.checkouttime
                  ? moment(day.checkouttime)
                  : null;
                const workingHours =
                  checkinMoment && checkoutMoment
                    ? checkoutMoment
                        .diff(checkinMoment, "hours", true)
                        .toFixed(2)
                    : "-";

                return (
                  <TableRow key={day.date}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell
                      sx={{
                        color: day.status === "Present" ? "green" : "red",
                      }}
                    >
                      {day.status}
                    </TableCell>
                    <TableCell>
                      {day.checkintime
                        ? moment(day.checkintime).format("HH:mm:ss")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {day.checkouttime
                        ? moment(day.checkouttime).format("HH:mm:ss")
                        : "-"}
                    </TableCell>
                    <TableCell>{workingHours}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <Box sx={{ marginTop: 2 }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: isMobile ? "12px" : "16px",
                  fontWeight: "bold",
                  color: "#388e3c",
                }}
              >
                Total Present Days: {daysPresent}
              </Typography>
            </Box>
          </Table>
        </Box>
      </Modal>
    </Box>
  );
};

export default Checkindashboard;
