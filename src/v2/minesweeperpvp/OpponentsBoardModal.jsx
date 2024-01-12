import { Box, Dialog } from "@mui/material";
import { OpponentCell } from "./OpponentCell";
import { useEffect, useState } from "react";


export const OpponentsBoardModal = ({ isOpen, setIsOpen, gameConfig, updatedCells }) => {

    const [cells, setCells] = useState(
        Array.from({ length: gameConfig.squaresPerHeight }, (_unused, rowIndex) => 
            Array.from({ length: gameConfig.squaresPerWidth }, (__unused, colIndex) => (
                {
                    isMine: false,
                    isOpen: false,
                    isFlagged: false,
                    neighborMines: 0,
                    position: {
                        rowIndex: rowIndex,
                        colIndex: colIndex,
                    }
                }
            ))
        )
    );

    useEffect(() => {
        if (updatedCells !== null) {
            setCells(prevCells => {
                const newObjectToSet = [...prevCells];

                prevCells.forEach((prevRowCells, rowIndex) => {
                    prevRowCells.forEach((prevCell, colIndex) => {
                        updatedCells.forEach(newCell => {
                            if (prevCell.position.rowIndex === newCell.position.rowIndex && prevCell.position.colIndex === newCell.position.colIndex) {
                                newObjectToSet[rowIndex][colIndex] = newCell;
                            }
                        });
                    })
                    
                })

                return newObjectToSet;
            });
            
        }
    }, [updatedCells]);

    const containerStyle = {
        width: gameConfig.width + 50,
        height: gameConfig.width + 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid black',
        borderRadius: '20px',
        backgroundColor: 'lightsteelblue',
        rowGap: '20px',
    }

    const boardStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: gameConfig.width,
        height: gameConfig.height,   
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                PaperProps={{ sx: { maxWidth: 'none', borderRadius: '20px' } }}
            >
                <Box sx={containerStyle}>
                    <Box sx={boardStyle}>
                        {cells.map((row, rowIndex) => (
                            row.map((col, colIndex) => (
                                <OpponentCell
                                    key={`${rowIndex}-${colIndex}`}
                                    cell={cells[rowIndex][colIndex]}
                                />
                            ))
                        ))}
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}