import { Box } from "@mui/material"
import { GameController } from "../minesweeperpvp/GameController"


export const GamePvP = () => {

    const containerStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
    }

    return (
        <>
            <Box sx={containerStyle}>
                <GameController />
            </Box>
        </>
    )
}