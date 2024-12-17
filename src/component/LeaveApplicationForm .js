import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

const LeaveApplicationForm = () => {
  const [formData, setFormData] = useState({
    purpose: "",
    note: "",
    leavedates: [null, null],
    days: "",
  });
  const [errors, setErrors] = useState({
    purpose: false,
    note: false,
    leavedates: false,
    days: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, leavedates: newValue });
  };

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};

    if (!formData.purpose) {
      formIsValid = false;
      validationErrors.purpose = true;
    }

    if (!formData.note) {
      formIsValid = false;
      validationErrors.note = true;
    }

    if (!formData.leavedates[0] || !formData.leavedates[1]) {
      formIsValid = false;
      validationErrors.leavedates = true;
    }

    if (!formData.days) {
      formIsValid = false;
      validationErrors.days = true;
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        ...formData,
        leavedates: formData.leavedates.map((date) =>
          date ? date.format("YYYY-MM-DD") : null
        ),
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/v1/api/leaveapplication/leaves",
          payload
        );
        console.log("Response:", response.data);
        alert("Leave application submitted successfully!");

        setFormData({
          purpose: "",
          note: "",
          leavedates: [null, null],
          days: "",
        });
      } catch (error) {
        console.error("Error submitting the leave application:", error);
        alert("Failed to submit leave application. Please try again later.");
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm" >
        <Box sx={{
        
        }}>
          <Typography variant="h5" gutterBottom>
            Leave Application Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                  Purpose
                </Typography>

                <TextField
                  fullWidth
                  name="purpose"
                  variant="outlined"
                  value={formData.purpose}
                  onChange={handleChange}
                  error={errors.purpose}
                  helperText={errors.purpose ? "Purpose is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                  Note
                </Typography>
                <TextField
                  fullWidth
                  name="note"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.note}
                  onChange={handleChange}
                  error={errors.note}
                  helperText={errors.note ? "Note is required" : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                      Start Date
                    </Typography>
                    <DatePicker
                      inputFormat="MM/DD/YYYY"
                      value={formData.leavedates[0]}
                      onChange={(date) =>
                        handleDateChange([date, formData.leavedates[1]])
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={errors.leavedates}
                          helperText={
                            errors.leavedates ? "Leave dates are required" : ""
                          }
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                      End Date
                    </Typography>
                    <DatePicker
                      inputFormat="MM/DD/YYYY"
                      value={formData.leavedates[1]}
                      onChange={(date) =>
                        handleDateChange([formData.leavedates[0], date])
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={errors.leavedates}
                          helperText={
                            errors.leavedates ? "Leave dates are required" : ""
                          }
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                  Days
                </Typography>
                <TextField
                  fullWidth
                  name="days"
                  variant="outlined"
                  value={formData.days}
                  onChange={handleChange}
                  error={errors.days}
                  helperText={errors.days ? "Number of days is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
               <Button
               variant="contained"
              
               sx={{
                 width: "20%",
           
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
               submit
                      </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default LeaveApplicationForm;
