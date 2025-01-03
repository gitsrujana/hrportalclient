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
} from "@mui/material";
import { Alert } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const EmployeeList = () => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null);  

  
  useEffect(() => {
    fetchEmployees();
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
      console.log("Updated Employee Data:", updatedEmployee); 
      const { email, ...updatePayload } = updatedEmployee;
  
   
      const response = await axios.put(
        `http://localhost:5000/v1/api/employees/update/${email}`,
        { ...updatePayload, email } 
      );
  

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
  

  return (
    <Box
      sx={{
        p: isMobile ? 0 : 3,
        mt: isMobile ? "-550px" : "-36%",
        width: isMobile ? "100%" : "80%",
        ml: isMobile ? "1%" : "15%",
        marginTop: "15%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Employee List
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
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Contact Number</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Salary</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
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
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.contactnumber}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.salary}</TableCell>
                  <TableCell>{employee.category}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(employee)}
                      sx={{ textTransform: "none", color: "blue", fontWeight: "bold" }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(employee.email)}
                      sx={{ textTransform: "none", color: "red", fontWeight: "bold" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

     
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

   
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

 
      {editingEmployee && (
        <Box sx={{ p: 3, mt: 10, width: "80%", backgroundColor: "white" }}>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Edit Employee
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingEmployee);
            }}
          >
            <TextField
              label="Name"
              value={editingEmployee.name}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
           <TextField
              label="Email"
              value={editingEmployee.email}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, email: e.target.value })
              }
              fullWidth
              margin="normal"
            /> 
            <TextField
              label="Contact Number"
              value={editingEmployee.contactnumber}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  contactnumber: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={editingEmployee.address}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, address: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salary"
              value={editingEmployee.salary}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, salary: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              value={editingEmployee.category}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, category: e.target.value })
              }
              fullWidth
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeList;
