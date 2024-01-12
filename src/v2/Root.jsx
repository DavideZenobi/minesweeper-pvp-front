import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import backgroundImage from './static/background.jpg';
//import Orbitron from 'https://fonts.googleapis.com/css2?family=Orbitron&display=swap';

export const Root = () => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        //fontFamily: Orbitron,
    }

    return (
        <>
            <Box sx={containerStyle}>
                <Outlet />
            </Box>
        </>
    );
}