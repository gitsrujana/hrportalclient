import React from 'react'
import EmployeeList from '../EmployeeList'
import LeaveApplicationList from '../LeaveApplicationList'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles";

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
  <Box 
  sx={{
    backgroundImage:`url("https://wallpaper.dog/large/20559316.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: 54,
    marginTop: isMobile ? "-630px" : "-40%", 
  }}
  >
  <EmployeeList/>
  <LeaveApplicationList/>
  </Box>
    
    </div>
  )
}

export default AdminDashboard
