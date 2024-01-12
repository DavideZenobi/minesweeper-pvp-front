import { Box } from "@mui/material";
import { GameController } from "../minesweeperpve/GameController";


export const GamePvE = () => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    }

    return (
        <>
            <Box sx={containerStyle}>
                <GameController />
            </Box>
        </>
    );
}