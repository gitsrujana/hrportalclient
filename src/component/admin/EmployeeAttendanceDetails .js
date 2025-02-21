import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const EmployeeAttendanceDetails = ({ email, attendanceData, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const employeeAttendance = attendanceData.filter(
    (att) => att.email === email
  );

  const daysPresent = employeeAttendance.filter(
    (att) => att.status === "Present"
  ).length;

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="employee-attendance-modal"
        aria-describedby="employee-attendance-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: "8px",
            boxShadow: 24,
            width: { xs: "90%", sm: "80%", md: "60%" },
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CloseIcon
            onClick={onClose}
            sx={{ color: "#000", marginLeft: "100%", color: "red" }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                flex: 1,
                textAlign: { xs: "center", sm: "left" },
                backgroundColor: "#006666",
                color: "#fff",
                padding: "16px",
                textAlign: "center",
                borderRadius: "8px 8px 0 0",
                marginTop: "5%",
                fontSize: isMobile ? "14px" : "18px",
              }}
            >
              {email} - Employee Attendance Details
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="employee attendance table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Check-in Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Check-out Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Working Hours
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeAttendance.map((attendance) => (
                  <TableRow key={`${attendance.email}-${attendance.date}`}>
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

          <Box sx={{ marginTop: 2 }}>
            <Typography
              sx={{
                textAlign: {
                  xs: "center",
                  sm: "left",
                  fontSize: isMobile ? "12px" : "16px",
                  fontWeight: "bold",
                  color: "#388e3c",
                },
              }}
            >
              Total Present Days: {daysPresent}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EmployeeAttendanceDetails;