import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { assets } from '../assets/assets';
import Sidebar from './Sidebar';
import { NavLink, useNavigate } from 'react-router-dom';

import ProfileIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from './AuthProvider ';


const settings = ['Profile', 'Account', 'Logout'];

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const isMobile = useMediaQuery("(max-width:768px)");
    const [anchorElUser, setAnchorElUser] = React.useState(null);
 const navigate=useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        setAnchorElUser(null); 
        navigate('/homepage')
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "#fdf5e6",
                    boxShadow: "none",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1 }}>
                            <NavLink to='/homepage'>
                            <CardMedia
                                component="img"
                                src={assets.logo}
                                sx={{ width: isMobile ? "60%" : "20%" }}
                            />
                            </NavLink>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Stack direction="row" spacing={2}>
                                <NavLink to="/Addemployee">
                                    <Button
                                        sx={{
                                            textTransform: "none",
                                            padding: "10px 24px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            letterSpacing: "1px",
                                            borderRadius: "50px",
                                            color: "black",
                                            "&:hover": {
                                                backgroundColor: "lightgreen",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Signup
                                    </Button>
                                </NavLink>
                                {!isAuthenticated ? (
                                    <>
                                        <NavLink to="/Login">
                                            <Button
                                                sx={{
                                                    textTransform: "none",
                                                    padding: "10px 24px",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    letterSpacing: "1px",
                                                    borderRadius: "50px",
                                                    color: "black",
                                                    "&:hover": {
                                                        backgroundColor: "lightgreen",
                                                        color: "white",
                                                    },
                                                }}
                                            >
                                                Signin
                                            </Button>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <ProfileIcon
                                            sx={{
                                                color: "black",
                                                cursor: "pointer",
                                                marginTop: "5%",
                                                height:"50px"
                                            }}
                                            onClick={handleOpenUserMenu}
                                        />
                                        <Menu
                                            anchorEl={anchorElUser}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                            sx={{ mt: "45px" }}
                                        >
                                            {settings.map((setting) => (
                                                <MenuItem
                                                    key={setting}
                                                    onClick={
                                                        setting === "Logout"
                                                            ? handleLogout
                                                            : handleCloseUserMenu
                                                    }
                                                >
                                                    <Typography textAlign="center">
                                                        {setting}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                )}
                            </Stack>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <CssBaseline />
        <Sidebar/>
        </>
    );
}

export default Navbar;
