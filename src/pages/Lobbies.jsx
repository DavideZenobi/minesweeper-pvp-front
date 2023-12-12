import { Box } from "@mui/material"


export const Lobbies = () => {

    const containerStyle = {
        border: '1px solid black',
        height: '500px',
        margin: 'auto',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    return (
        <>
            <Box sx={containerStyle}>
                <h2>Lobbies</h2>
            </Box>
        </>
    );
}