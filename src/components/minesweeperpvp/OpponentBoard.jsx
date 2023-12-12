import { Box, Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatchContext } from "../../contexts/MatchContext";
import { getSocket } from "../../utils/WebSocket";
import { OpponentBoardCell } from "./OpponentBoardCell";


export const OpponentBoard = ({ open, onClose }) => {
    const { boardConfig } = useMatchContext();

    const socket = getSocket();

    const [cells, setCells] = useState(
        Array.from({ length: boardConfig.cellsPerSide }, () =>
            Array.from({ length: boardConfig.cellsPerSide }, () => ({
                isMine: false,
                isOpen: false,
                isFlagged: false,
                neighborMines: 0,
            }))
        )
    )

    const boardStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: boardConfig.style.width,
        height: boardConfig.style.height,
    }

    useEffect(() => {
        socket.on('opponent-board-update', (data) => {
            setCells(data);
        });
        
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle sx={{textAlign: 'center'}}>Opponent</DialogTitle>
                <Box sx={boardStyle}>
                    {cells.map((row, rowIndex) => (
                        row.map((col, colIndex) => (
                            <OpponentBoardCell
                                key={`${rowIndex}-${colIndex}`}
                                cell={cells[rowIndex][colIndex]}
                            />
                        ))
                    ))}
                </Box>
            </Dialog>  
        </>
    );
}