import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useState } from "react";
import { FindMatchModal } from "./modals/FindMatchModal";

export const TopBar = () => {
    const { user, logoutCx } = useAuthContext();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
    }

    const handleLogout = async () => {
        const response = await logoutCx();

        if (response.ok) {
            setTimeout(() => {
                navigate('/');
            }, 2 * 1000);
        }
    }

    return (
        <>
            <Box sx={containerStyle}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '25%'}}>
                    <IconButton style={{ fontSize: '64px' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <AccountCircleIcon fontSize="inherit" />
                    </IconButton>
                    <h2>{user.username}</h2>
                </Box>
                <Box sx={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link to='/home'>Home</Link>
                </Box>
                <Box sx={{width: '25%'}}>

                </Box>
            </Box>
            <Menu
                open={isOpen}
                anchorEl={anchorEl}
                onClick={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => navigate('/profile')}>
                    <AccountBoxIcon /> Profile
                </MenuItem>
                <MenuItem sx={{color: 'red'}} onClick={handleLogout}>
                    <LogoutIcon /> Log out
                </MenuItem>
            </Menu>
            <FindMatchModal />
            <Outlet />
        </>
    );
}