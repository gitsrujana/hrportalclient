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
  TextField,
  CircularProgress,
  Snackbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled, useMediaQuery } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import EmployeeAttendanceDetails from './EmployeeAttendanceDetails ';

const Header = styled(Box)(() => ({
  backgroundColor: "#006666",
  color: "#fff",
  padding: "16px",
  textAlign: "center",
  borderRadius: "8px 8px 0 0",
}));

const EmployeeManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]); // Store all attendance data
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState(null); // For showing modal

  useEffect(() => {
    fetchEmployees();
    fetchAttendanceData(); // Fetch attendance data as well
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/v1/api/employees/get");
      setEmployees(response.data);
    } catch (error) {
      setError("Failed to fetch employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/api/attendance/get");
      setAttendanceData(response.data);
    } catch (error) {
      setError("Failed to fetch attendance data. Please try again.");
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/v1/api/employees/delete/${email}`);
        if (response.status === 200) {
          setEmployees(employees.filter((employee) => employee.email !== email));
          alert("Employee deleted successfully!");
        } else {
          alert("Failed to delete the employee.");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete the employee. Please try again.");
      }
    }
  };

  const handleEdit = (employee) => {
    console.log("Editing Employee:", employee);
    setEditingEmployee(employee);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      const { email, ...updatePayload } = updatedEmployee;
      const response = await axios.put(`http://localhost:5000/v1/api/employees/update/${email}`, { ...updatePayload, email });
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.email === updatedEmployee.email ? response.data : employee
        )
      );
      setEditingEmployee(null);
      setSuccessMessage("Employee updated successfully!");
    } catch (error) {
      setError("Failed to update the employee. Please try again.");
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmployeeEmail(email); // Set the selected employee email to show the attendance details
  };

  const handleCloseModal = () => {
    setSelectedEmployeeEmail(null); // Close the modal by resetting the email
  };

  return (
    <>
      <Sidebar />
      <Box
        sx={{
          p: isMobile ? 0 : 3,
          mt: isMobile ? "-550px" : "-36%",
          width: isMobile ? "95%" : "80%",
          ml: isMobile ? "2%" : "18%",
          marginTop: "5%",
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
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          Manage Employees
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Contact Number</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.email}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      {employee.profilePicture ? (
                        <img
                          src={`http://localhost:5000/${employee.profilePicture}`}
                          alt={`${employee.name}'s Profile`}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell onClick={() => handleEmailClick(employee.email)} sx={{ textDecoration: 'none' }}>
                     
                        {employee.email}
                   
                    </TableCell>
                    <TableCell>{employee.contactnumber}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>{employee.category}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          color="primary"
                          sx={{ marginRight: "8px" }}
                          onClick={() => handleEdit(employee)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(employee.email)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedEmployeeEmail && (
          <EmployeeAttendanceDetails
            email={selectedEmployeeEmail}
            attendanceData={attendanceData}
            onClose={handleCloseModal}
          />
        )}

        {/* Snackbar for success and error */}
      </Box>
    </>
  );
};

export default EmployeeManagement;
