import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Box,
  CssBaseline,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from '@mui/icons-material/Today';
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Employee Management", icon: <GroupIcon />, path: "/employeemaagement" },
    { text: "Category", icon: <CategoryIcon />, path: "/category" },
    { text: "Leaves", icon: <EventAvailableIcon />, path: "/leaves" },
    { text: "Salary", icon: <AttachMoneyIcon />, path: "/salary" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Attendance", icon: <TodayIcon />, path: "/attendance" },
  ];

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
    
      {isMobile && (
        <IconButton
          onClick={handleToggle}
          sx={{
            marginLeft: "10px",
            marginTop: "20%",
            color: "#006666"
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

    
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={handleToggle}
        sx={{
          position: "fixed",
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#006666",
            color: "#fff",
            marginTop: "2%",
            paddingTop: "5%",
          },
        }}
        anchor="left"
      >
        <List sx={{ marginTop: isMobile ? "10%" : "5%" }}>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "24px",
          marginLeft: isMobile ? 0 : 240, 
          transition: 'margin 0.3s',
          color: "#006666",
        }}
      >
     
      </Box>
    </Box>
  );
};

export default Admin;
