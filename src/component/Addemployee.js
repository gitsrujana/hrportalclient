import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Addemployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactnumber: "",
    salary: "",
    address: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("contactnumber", formData.contactnumber);
    formDataToSend.append("salary", formData.salary);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("category", formData.category);
    if (file) {
      formDataToSend.append("profilePicture", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/v1/api/employees/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Employee added successfully!");
      navigate("/employeelist");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: isMobile ? 1 : 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: isMobile ? "-630px" : "-40%",
        backgroundImage:`url("https://wallpaper.dog/large/20559316.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: 54, 
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: isMobile ? "95%" : "700px",
          boxShadow: 3,
          p: isMobile ? 2 : 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isMobile ? "16px" : "18px",
            mb: 2,
          }}
        >
          Add Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Name
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            required
            placeholder="Enter employee name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Email
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="email"
            variant="outlined"
            required
            placeholder="Enter employee email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Password
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            required
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            required
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Contact Number
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            required
            placeholder="Enter contactnumber"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleChange}
          />
          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Salary
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            required
            placeholder="Enter salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Address
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            required
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Category
          </Typography>
          <TextField
            select
            fullWidth
            margin="normal"
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
          </TextField>

          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Upload Profile Picture
          </Typography>
          <Stack direction={isMobile ? "column" : "row"} spacing={1}>
            <input
              accept="image/*"
              type="file"
              name="profilePicture"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: "#ff6f00",
                  marginTop: "5%",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#00c853",
                  },
                }}
              >
                Choose File
              </Button>
            </label>
            {fileName && (
              <Typography
                variant="body2"
                sx={{
                  marginTop: isMobile ? "8px" : "16px",
                  color: "#555",
                  textAlign: isMobile ? "start" : "center",
                  wordWrap: "break-word",
                }}
              >
                Selected File: <strong>{fileName}</strong>
              </Typography>
            )}
          </Stack>
          <br />

          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #00c853, #ff6f00)",
              color: "#fff",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              marginTop: "2%",
              "&:hover": {
                background: "linear-gradient(135deg, #ff6f00, #00c853)",
              },
            }}
          >
            Add Employee
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Addemployee;
