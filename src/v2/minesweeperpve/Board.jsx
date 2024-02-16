import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { gameConfigs } from "../utils/gameconfigs";

export const Board = ({ gameConfig = gameConfigs.easy, onClick, newCells = null }) => {

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

    const boardStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: gameConfig.width,
        height: gameConfig.height,   
    }

    return (
        <>
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
        </>
    );
}