import { Box, Dialog, DialogTitle } from "@mui/material";


export const InterruptModal = ({ open, onClose }) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <DialogTitle>You have won the match</DialogTitle>
                    <h4>Your opponent has left</h4>
                </Box>
            </Dialog>    
        </>
    );
}