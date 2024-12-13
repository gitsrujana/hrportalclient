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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const EmployeeList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/api/employees/get"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees. Please try again.");
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `http://localhost:5000/v1/api/employees/delete/${id}`
        );
        setEmployees(employees.filter((employee) => employee.id !== id));
        alert("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete the employee. Please try again.");
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      const { id, ...updatePayload } = updatedEmployee;

      const response = await axios.put(
        `http://localhost:5000/v1/api/employees/update/${id}`,
        updatePayload
      );

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === updatedEmployee.id ? response.data : employee
        )
      );

      setEditingEmployee(null);
      alert("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update the employee. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        p: isMobile ? 0 : 3,
        mt: isMobile ? "-550px" : "-36%",
        width: isMobile ? "100%" : "80%",
        ml: isMobile ? "1%" : "15%",
        
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Id</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>contactNumber</strong>
              </TableCell>
              <TableCell>
                <strong>Address</strong>
              </TableCell>
              <TableCell>
                <strong>Salary</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
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
                    sx={{
                      textTransform: "none",

                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDelete(employee.id)}
                    sx={{
                      textTransform: "none",

                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingEmployee && (
        <Box sx={{ p: 3, mt: 10, width: "80%" ,backgroundColor:"white"}}>
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
                setEditingEmployee({
                  ...editingEmployee,
                  email: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="contactnumber"
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
              label="address"
              value={editingEmployee.address}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  address: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="salary"
              value={editingEmployee.salary}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  salary: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="category"
              value={editingEmployee.category}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  category: e.target.value,
                })
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
