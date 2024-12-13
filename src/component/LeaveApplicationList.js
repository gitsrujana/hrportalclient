import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container, Paper } from "@mui/material";
import axios from "axios";

const LeaveApplicationList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/api/leaveapplication/get"
        );
        setLeaves(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching leave data.");
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  const displayLeaveData = () => {
    if (loading) {
      return <Typography>Loading leave applications...</Typography>;
    }

    if (error) {
      return <Typography color="error">{error}</Typography>;
    }

    if (leaves.length === 0) {
      return <Typography>No leave applications found.</Typography>;
    }

    return (
      <Grid container spacing={3} sx={{marginLeft:"2%"}}>
        {leaves.map((leave) => (
          <Grid item xs={12} md={6} key={leave.id}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "start" }}>
              <Typography variant="h6">Leave Request</Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Purpose:</strong> {leave.purpose}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Note:</strong> {leave.note}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Leave Dates:</strong> {leave.leavedates.join(", ")}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Days:</strong> {leave.days}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Leave Applications
        </Typography>
        {displayLeaveData()}
      </Box>
    </Container>
  );
};

export default LeaveApplicationList;
