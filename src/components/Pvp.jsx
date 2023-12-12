import { Box } from "@mui/material";
import { JoinQuickMatchButton } from "./JoinQuickMatchButton";
import { AcceptMatchModal } from './common/FoundMatchModal';


export const Pvp = () => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',

    }

    const handleClose = () => {
        
    }

    return (
        <>
            <h2>PvP</h2>
            <Box sx={containerStyle}>
                <JoinQuickMatchButton />
            </Box>
        </>
    );
}