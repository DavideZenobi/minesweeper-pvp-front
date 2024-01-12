import { Box, Dialog, DialogTitle, Divider } from "@mui/material";


export const FinalGameModal = ({ isOpen, result, setIsOpen }) => {



    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <DialogTitle sx={{color: result.status === 'won' ? 'green' : 'red'}}>You have {result.status}</DialogTitle>
                    <Divider />
                    <p>Score: {result.score} points</p>
                    <p>Time: {result.time} seconds</p>
                </Box>
            </Dialog>
        </>
    );
}