import { Box, Dialog, DialogTitle } from "@mui/material";


export const EndGameModal = ({ open = false, onClose, score = 0, result }) => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        height: '300px',
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Box sx={containerStyle}>
                    <DialogTitle>You {result}</DialogTitle>
                    <h4>Score: {score}</h4>
                </Box>
            </Dialog>
        </>
    );
}