import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   navigate("/login");
  // };

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        backgroundColor: "gray",
        color: "white",
        height: "100%",
        marginTop: isMobile ? "20%" : "36%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mt: 2,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </Typography>
      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <NavLink
            to="/admindashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItemText primary="Dashboard" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <PeopleIcon />
          </ListItemIcon>
          <NavLink
            to="/employerdashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItemText primary="Manage Employees" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <CategoryIcon />
          </ListItemIcon>
          <NavLink
            to="/category"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItemText primary="Category" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <PersonIcon />
          </ListItemIcon>
          <NavLink
            to="/profile"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItemText primary="Profile" />
          </NavLink>
        </ListItem>
        {/* <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem> */}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: isDrawerOpen ? "" : "",
        minHeight: "100vh",
        transition: "background-color 0.3s ease-in-out",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        sx={{
          position: "fixed",
          top: isMobile ? 48 : 90,
          left: isMobile ? 2 : 16,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",

            color: "white",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
