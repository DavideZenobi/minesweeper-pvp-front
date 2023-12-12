import { MatchController } from "../components/minesweeperpvp/MatchController";
import { Box } from "@mui/material";
import { MatchProvider } from "../contexts/MatchContext";

export const GamePvP = () => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    return (
        <>
            <Box sx={containerStyle}>
                <MatchProvider>
                    <MatchController />
                </MatchProvider>
            </Box>
        </>
    );
}