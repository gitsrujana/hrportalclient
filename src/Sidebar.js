import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen size is mobile

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Manage Employees", icon: <GroupIcon />, path: "/manage-employees" },
    { text: "Category", icon: <CategoryIcon />, path: "/category" },
    { text: "Leaves", icon: <EventAvailableIcon />, path: "/leaves" },
    { text: "Salary", icon: <AttachMoneyIcon />, path: "/salary" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Hamburger Menu Icon for Mobile */}
      {isMobile && (
        <IconButton onClick={handleToggle} sx={{ marginLeft: "10px", marginTop: "10px" }}>
          <MenuIcon sx={{ color: "#006666" }} />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // Temporary for mobile, permanent for desktop
        open={open}
        onClose={handleToggle} // Close the sidebar when clicked outside on mobile
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#006666",
            color: "#fff",
            marginTop: "5%",
          },
        }}
        anchor="left"
      >
        <List sx={{marginTop:isMobile?'15%':"5%"}}>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "24px",color:"#006666" }}>
        {/* Your main content goes here */}
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

export default Sidebar;
