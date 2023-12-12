import { Game } from "../minesweeper/Game";
import { Box } from "@mui/material";


export const GamePvE = () => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        alignItems: 'center',
    }

    return (
        <>
            <Box sx={containerStyle}>
                <Game />
            </Box>
        </>
    );
}