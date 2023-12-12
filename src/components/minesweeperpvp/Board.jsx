import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useMatchContext } from "../../contexts/MatchContext";
import { Cell } from "./Cell";
import { Timer } from "./Timer";
import { MovementTimer } from "./MovementTimer";

export const Board = ({ onFinish, sendBoardUpdate }) => {
    const visitedBlankCells = []; // [{x, y}]

    const { matchStatus, boardConfig } = useMatchContext();

    const [time, setTime] = useState(); // Total of seconds
    const [needToReset, setNeedToReset] = useState(false);
    const [cells, setCells] = useState(
        Array.from({ length: boardConfig.cellsPerSide }, () =>
            Array.from({ length: boardConfig.cellsPerSide }, () => ({
                isMine: false,
                isOpen: false,
                isFlagged: false,
                neighborMines: 0,
            }))
        )
    );
    const [minesLeft, setMinesLeft] = useState(boardConfig.mines);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    const boardStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }

    useEffect(() => {
        if (matchStatus === 'running') {
            sendBoardUpdate(cells);
            checkResult();
        }
    }, [cells]);

    const generateMines = () => {
        let minesPlaced = 0;

        while (minesPlaced < boardConfig.mines) {
            const randomRow = Math.floor(Math.random() * boardConfig.cellsPerSide);
            const randomCol = Math.floor(Math.random() * boardConfig.cellsPerSide);

            if (!cells[randomRow][randomCol].isOpen && !cells[randomRow][randomCol].isMine) {
                cells[randomRow][randomCol].isMine = true;
                minesPlaced++;
            }
        }
    }

    const countNeighborMines = () => {
        for (let x = 0; x < boardConfig.cellsPerSide; x++) {
            for (let y = 0; y < boardConfig.cellsPerSide; y++) {
                if (!cells[x][y].isMine) {
                    let counter = 0;
                    for (let newX = x - 1; newX <= x + 1; newX++) {
                        if (newX >= 0 && newX < boardConfig.cellsPerSide) {
                            for(let newY = y - 1; newY <= y + 1; newY++) {
                                if (newY >= 0 && newY < boardConfig.cellsPerSide) {
                                    if (cells[newX][newY].isMine) {
                                        counter++;
                                    }
                                }
                            }
                        }
                    }
                    cells[x][y].neighborMines = counter;
                }
            }
        }
    }

    const checkBlankCell = (position) => {
        // Control de los límites del tablero
        if (position.rowIndex < 0 || position.rowIndex >= boardConfig.cellsPerSide || position.colIndex < 0 || position.colIndex >= boardConfig.size) {
            return;
        }

        // Control de si es una mina o no está en blanco
        if (cells[position.rowIndex][position.colIndex].isMine || cells[position.rowIndex][position.colIndex].neighborMines !== 0) {
            return;
        }

        // Controlar si ya se ha gestionado antes esta casilla en blanco
        for (const visited of visitedBlankCells) {
            if (visited.x === position.rowIndex && visited.y === position.colIndex) {
                return;
            }
        }

        visitedBlankCells.push({x: position.rowIndex, y: position.colIndex});

        for(let x = position.rowIndex - 1; x <= position.rowIndex + 1; x++) {
            for (let y = position.colIndex - 1; y <= position.colIndex + 1; y++) {
                if (x >= 0 && x < boardConfig.cellsPerSide && y >= 0 && y < boardConfig.cellsPerSide) {
                    cells[x][y].isOpen = true;
                    checkBlankCell({rowIndex: x, colIndex: y});
                }
            }
        }
    }

    // El tamaño del area va en función de la configuración
    const openStarterArea = (position) => {
        // -1 +1 en caso de que la zona que se abre sea 3x3
        // -2 +2 5x5
        // -3 +3 7x7
        for (let x = position.rowIndex - 1; x <= position.rowIndex + 1; x++) {
            if (x >= 0 && x < boardConfig.cellsPerSide) {
                for (let y = position.colIndex - 1; y <= position.colIndex + 1; y++) {
                    if (y >= 0 && y < boardConfig.cellsPerSide) {
                        cells[x][y].isOpen = true;
                    }
                }
            }
        }
    }

    const handleClick = (position) => {
        if (matchStatus === 'running') {
            setNeedToReset(true);
            if (cells.flat().every(cell => !cell.isOpen && !cells[position.rowIndex][position.colIndex].isFlagged)) {
                handleFirstClick(position);
                checkBlankCell(position);
                setCells(prevCells => {
                    const newCells = [...prevCells];
                    return newCells;
                })
            } else {
                if (!cells[position.rowIndex][position.colIndex].isFlagged) {
                    handleOpenCell(position);
                    checkBlankCell(position);
                }
            }
        }
    }

    // Gestiona la apertura de las casillas
    const handleOpenCell = (position) => {
        const x = position.rowIndex;
        const y = position.colIndex;

        setCells(prevCells => {
            const newCells = [...prevCells];
            newCells[x] = [...newCells[x]];
            newCells[x][y] = {
                ...newCells[x][y],
                isOpen: true
            };

            return newCells;
        });
    }

    // Gestiona el click derecho sobre las casillas
    const handleFlagCell = (event, position) => {
        event.preventDefault();
        if (matchStatus === 'running') {
            const x = position.rowIndex;
            const y = position.colIndex;
            setCells(prevCells => {
                const newCells = [...prevCells];
                newCells[x] = [...newCells[x]];
                newCells[x][y] = {
                    ...newCells[x][y],
                    isFlagged: !newCells[x][y].isFlagged
                };

                if (newCells[x][y].isFlagged) {
                    setMinesLeft(minesLeft - 1);
                } else {
                    setMinesLeft(minesLeft + 1);
                }

                return newCells;
            });
        }
    }

    // Gestiona el primer click llamando a todos los métodos necesarios
    const handleFirstClick = (position) => {
        openStarterArea(position);
        generateMines();
        countNeighborMines();
    }

    const checkResult = () => {
        const isLost = cells.flat().some(cell => cell.isMine && cell.isOpen);
        if (isLost) {
            onFinish({cells: cells, time: time});
        }

        const isWin = cells.flat().filter(cell => !cell.isMine).every(cell => cell.isOpen);
        if (isWin) {
            onFinish({cells: cells, time: time});
        }
    }

    return (
        <>
            <Box sx={containerStyle}>
                <Timer setTime={setTime} />
                <MovementTimer 
                    reset={needToReset}
                    onReset={() => setNeedToReset(false)}
                    onZero={() => onFinish({cells: cells, time: time})}
                />
                <h3>Mines left: {minesLeft}</h3>
                <Box sx={[boardStyle, boardConfig.style]}>
                    {cells.map((row, rowIndex) => (
                        row.map((col, colIndex) => (
                            <Cell 
                                key={`${rowIndex}-${colIndex}`} 
                                onClick={handleClick} 
                                onRightClick={handleFlagCell}
                                coordinates={{rowIndex, colIndex}}
                                cell={cells[rowIndex][colIndex]}
                            />
                        ))
                    ))}
                </Box>
            </Box>
        </>
    );
}