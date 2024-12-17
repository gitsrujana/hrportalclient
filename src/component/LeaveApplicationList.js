import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LeaveApplicationList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [leaves, setLeaves] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Logged-in user email state

  useEffect(() => {
    // Fetch user email from localStorage
    const loggedInEmail = localStorage.getItem("userEmail"); // Replace "userEmail" with your key
    if (loggedInEmail) {
      setUserEmail(loggedInEmail);
    }

    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/api/leaveapplication/get"
        );
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
        alert("Failed to fetch leave applications. Please try again.");
      }
    };

    fetchLeaveData();
  }, []);

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this leave application?")) {
      try {
        await axios.put("http://localhost:5000/v1/api/leaveapplication/approve/${id}");
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === id ? { ...leave, status: "Approved" } : leave
          )
        );
        alert("Leave application approved successfully!");
      } catch (error) {
        console.error("Error approving leave application:", error);
        alert("Failed to approve the leave application. Please try again.");
      }
    }
  };

  const handleDeny = async (id) => {
    if (window.confirm("Are you sure you want to deny this leave application?")) {
      try {
        await axios.put("http://localhost:5000/v1/api/leaveapplication/deny/${id}");
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === id ? { ...leave, status: "Denied" } : leave
          )
        );
        alert("Leave application denied successfully!");
      } catch (error) {
        console.error("Error denying leave application:", error);
        alert("Failed to deny the leave application. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        mt: isMobile ? 2 : 4,
        width: isMobile ? "100%" : "80%",
        ml: "auto",
        mr: "auto",
      }}
    >
      {/* Displaying logged-in user's email */}
      {userEmail && (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Welcome, {userEmail}!
        </Typography>
      )}

      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Leave Applications
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Id</strong>
              </TableCell>
              
              <TableCell>
                <strong>Purpose</strong>
              </TableCell>
              <TableCell>
                <strong>Note</strong>
              </TableCell>
              <TableCell>
                <strong>Leave Dates</strong>
              </TableCell>
              <TableCell>
                <strong>Days</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.id}</TableCell>
                <TableCell>{leave.purpose}</TableCell>
                <TableCell>{leave.note}</TableCell>
                <TableCell>{leave.leavedates.join(", ")}</TableCell>
                <TableCell>{leave.days}</TableCell>
                <TableCell>{leave.status || "Pending"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleApprove(leave.id)}
                    sx={{
                      textTransform: "none",
                      color: "green",
                      fontWeight: "bold",
                    }}
                    disabled={leave.status === "Approved"}
                  >
                    Approve
                  </Button>

                  <Button
                    onClick={() => handleDeny(leave.id)}
                    sx={{
                      textTransform: "none",
                      color: "red",
                      fontWeight: "bold",
                    }}
                    disabled={leave.status === "Denied"}
                  >
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveApplicationList;