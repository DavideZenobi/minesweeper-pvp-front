import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Cell } from "./Cell";

export const Board = ({ gameConfig, onClick, newCells }) => {

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
        if (newCells !== null) {
            setCells(prevCells => {
                const newObjectToSet = [...prevCells];

                prevCells.forEach((prevRowCells, rowIndex) => {
                    prevRowCells.forEach((prevCell, colIndex) => {
                        newCells.forEach(newCell => {
                            if (prevCell.position.rowIndex === newCell.position.rowIndex && prevCell.position.colIndex === newCell.position.colIndex) {
                                newObjectToSet[rowIndex][colIndex] = newCell;
                            }
                        });
                    })
                    
                })

                return newObjectToSet;
            });
            
        }
    }, [newCells]);

    useEffect(() => {
        setCells(
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
    }, [gameConfig]);

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
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={containerStyle}>
                    <Box sx={boardStyle}>
                        {cells.map((row, rowIndex) => (
                            row.map((col, colIndex) => (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    cell={cells[rowIndex][colIndex]}
                                    onClick={onClick}
                                />
                            ))
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}