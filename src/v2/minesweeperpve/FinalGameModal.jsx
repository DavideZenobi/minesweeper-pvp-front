import { useEffect } from "react";
import OkIcon from '../static/ok.png';
import LostIcon from '../static/error.png';

export const FinalGameModal = ({ isOpen, result, onClose }) => {

    useEffect(() => {
        if (isOpen) {
            openModal();
        }
    }, [isOpen]);

    const openModal = () => {
        const dialog = document.getElementById('dialog-final-game');
        dialog.showModal();
    }

    const closeModal = () => {
        const dialog = document.getElementById('dialog-final-game');
        dialog.close();
        onClose();
    }

    return (
        <>
            <dialog
                id="dialog-final-game"
                className="backdrop:backdrop-blur-sm p-10 bg-gray-800 rounded-md"
            >
                <div className="flex flex-col items-center w-96 gap-y-4">
                    <img src={result.status === 'won' ? OkIcon : LostIcon} alt="okey" width='96' height='96'/>
                    <div className="flex flex-col items-center text-slate-300">
                        <p>{result.status === 'won' ? 'Win' : 'Lose'}</p>
                        <p>Score: {result.score} points</p>
                        <p>Time: {result.time} seconds</p>
                    </div>
                    <div onClick={closeModal} className="border rounded-sm border-black w-20 text-center cursor-pointer bg-red-400">
                        Close
                    </div>
                </div>
                
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