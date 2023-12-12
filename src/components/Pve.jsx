import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Pve = () => {
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
    }

    const handlePlay = () => {
        navigate('/game');
    }

    return (
        <>
            <h2>PvE</h2>
            <Box sx={containerStyle}>
                <Button onClick={handlePlay} size="small" variant="contained" >Play</Button>
            </Box>
        </>
    );
}