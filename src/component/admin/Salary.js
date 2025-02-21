import React from 'react'
import Sidebar from "./Sidebar";
import { Typography,Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import {useMediaQuery }from '@mui/material';
const Salary = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
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
            marginTop: "20%",
            textAlign: "center",
            fontSize: { xs: "24px", sm: "32px", md: "40px" },
            fontWeight: "bold",
            letterSpacing: "2px",
            color:"orangered",
          
            
          }}
        >
         this feature is under development
        </Typography>
</Box>
    </div>
  )
}

export default Salary
