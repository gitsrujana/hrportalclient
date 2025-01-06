import { Grid, Typography } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'

const Admin = () => {
  return (
    <>
      <Sidebar />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
         
          padding: { xs: "20px", sm: "30px", md: "40px" }, 
        }}
      >
        <Grid item xs={12} sm={10} md={8}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "24px", sm: "32px", md: "40px" },  
              fontWeight: "bold",
              letterSpacing: "2px",
              color: "orangered",
              marginTop: { xs: "5%", sm: "15%", md: "20%" },  
            }}
          >
            Welcome to Admin Dashboard
          </Typography>
        </Grid>
      </Grid>
   
    </>
  )
}

export default Admin
