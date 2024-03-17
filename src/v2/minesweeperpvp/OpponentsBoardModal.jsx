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
        if (isOpen) {
            openModal();
        }
    }, [isOpen]);

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

    const openModal = () => {
        const dialog = document.getElementById('opponent-board-modal');
        dialog.showModal();
    }

    const closeModal = () => {
        const dialog = document.getElementById('opponent-board-modal');
        dialog.close();
        setIsOpen(false);
    }

    return (
        <>
            <dialog id="opponent-board-modal" className="backdrop:backdrop-blur-sm p-2 rounded-sm bg-gray-800">
                <div className="flex flex-col items-center gap-y-2">
                    <div className="flex flex-wrap w-[750px] ">
                        {cells.map((row, rowIndex) => (
                            row.map((col, colIndex) => (
                                <OpponentCell
                                    key={`${rowIndex}-${colIndex}`}
                                    cell={cells[rowIndex][colIndex]}
                                />
                            ))
                        ))}
                    </div>
                    <div onClick={closeModal} className="text-slate-300 px-2 rounded-sm bg-blue-600 text-center w-20 cursor-pointer hover:bg-blue-500">Close</div>
                </div>
            </dialog>
        </>
    )
}