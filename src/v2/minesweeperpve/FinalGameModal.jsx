import { useEffect } from "react";


export const FinalGameModal = ({ isOpen, result, onClose }) => {

    useEffect(() => {
        if (isOpen) {
            openModal();
        }
    }, [isOpen]);

    const openModal = () => {
        const dialog = document.getElementById('dialog');
        dialog.showModal();
    }

    const closeModal = () => {
        const dialog = document.getElementById('dialog');
        dialog.close();
        onClose();
    }

    return (
        <>
            <dialog
                id="dialog"
                onClick={closeModal}
                className="backdrop:backdrop-blur-sm"
            >
                Hola
            </dialog>
        </>
    );
}

/**
 * <Dialog
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
 */