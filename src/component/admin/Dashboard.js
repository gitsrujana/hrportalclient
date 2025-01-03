import React from 'react';
import { Box, Card, CardContent, Typography, Grid, useMediaQuery, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
       <Admin />

    <Box
      sx={{
       
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      marginTop:"10%",
      marginLeft:isMobile?"1%":"10%"
      }}
    >
   
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
    
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
                width:isMobile?"90%":"100%",
                marginLeft:isMobile?"4%":"0%",
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              boxShadow: theme.shadows[5],
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => handleNavigation('/employeemaagement')}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <IconButton sx={{ marginBottom: isMobile ? '8px' : '0', marginRight: isMobile ? '0' : '16px' }}>
                <PeopleIcon fontSize="large" color="primary" />
              </IconButton>
              <Typography variant="h6">Employee Management</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
             sx={{
                width:isMobile?"90%":"100%",
                marginLeft:isMobile?"4%":"0%",
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              boxShadow: theme.shadows[5],
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => handleNavigation('/attendance')}
          >
            <CardContent
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <IconButton sx={{ marginBottom: isMobile ? '8px' : '0', marginRight: isMobile ? '0' : '16px' }}>
                <AccessTimeIcon fontSize="large" color="primary" />
              </IconButton>
              <Typography variant="h6">Attendance Management</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Dashboard;
