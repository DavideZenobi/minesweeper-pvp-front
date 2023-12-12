import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { Box, Button } from "@mui/material";
import { EndGameModal } from "./EndGameModal";
import { Timer } from "./Timer";


export const Board = ({ config, style, isGameRunning, setIsGameRunning }) => {
    const visitedBlankCells = []; // {x, y}

    const [cells, setCells] = useState([]);
    const [minesLeft, setMinesLeft] = useState();

    // EndGameModal
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState();

    const [isTimerRunning, setIsTimerRunning] = useState(false);

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
        initializeBoard();
    }, [config]);

    useEffect(() => {
        if (isGameRunning) {
            checkWin();
            checkLose();
        }
    }, [cells]);
    
    const initializeBoard = () => {
        const { boardSize, minesQuantity } = config || {};
        setMinesLeft(minesQuantity);

        const newCells = Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => ({
                isMine: false,
                isOpen: false,
                isFlagged: false,
                neighborMines: 0,
            }))
        );
        setCells(newCells);
    }

    // Cuando se clicka por primera vez, se generan las minas.
    const generateMines = () => {
        let minesPlaced = 0;

        while (minesPlaced < config.minesQuantity) {
            const randomRow = Math.floor(Math.random() * config.boardSize);
            const randomCol = Math.floor(Math.random() * config.boardSize);

            if (!cells[randomRow][randomCol].isOpen && !cells[randomRow][randomCol].isMine) {
                cells[randomRow][randomCol].isMine = true;
                minesPlaced++;
            }
        }
    }

    // Cuando se clicka por primera vez, se cuentan las minas adyacentes de todas las casillas para así asignar el número correspondiente.
    const countNeighborMines = () => {
        for (let x = 0; x < config.boardSize; x++) {
            for (let y = 0; y < config.boardSize; y++) {
                if (!cells[x][y].isMine) {
                    let counter = 0;
                    for (let newX = x - 1; newX <= x + 1; newX++) {
                        if (newX >= 0 && newX < config.boardSize) {
                            for(let newY = y - 1; newY <= y + 1; newY++) {
                                if (newY >= 0 && newY < config.boardSize) {
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
        if (position.rowIndex < 0 || position.rowIndex >= config.boardSize || position.colIndex < 0 || position.colIndex >= config.boardSize) {
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
                if (x >= 0 && x < config.boardSize && y >= 0 && y < config.boardSize) {
                    cells[x][y].isOpen = true;
                    checkBlankCell({rowIndex: x, colIndex: y});
                }
            }
        }
    }


    // Cuando se clicka por primera vez, se descubre un área alrededor de la casilla clickada
    // El tamaño del area va en función de la configuración
    const openStarterArea = (position) => {
        // -1 +1 en caso de que la zona que se abre sea 3x3
        // -2 +2 5x5
        // -3 +3 7x7
        for (let x = position.rowIndex - 1; x <= position.rowIndex + 1; x++) {
            if (x >= 0 && x < config.boardSize) {
                for (let y = position.colIndex - 1; y <= position.colIndex + 1; y++) {
                    if (y >= 0 && y < config.boardSize) {
                        cells[x][y].isOpen = true;
                    }
                }
            }
        }
    }

    // Reset de la partida
    const handleReset = () => {
        resetCells();
        initializeBoard();
        setIsGameRunning(false);
        setIsTimerRunning(false);
        setResult('');
    }

    // Reset de las casillas
    const resetCells = () => {
        setCells((prevCells) =>
            prevCells.map((row) =>
                row.map((col) => ({
                    ...col,
                    isOpen: false,
                    isMine: false,
                    isFlagged: false,
                    neighborMines: 0,
                }))
            )
        );
    }

    const handleClick = (position) => {
        if (!isGameRunning && cells.flat().every(cell => !cell.isOpen)) {
            setIsTimerRunning(true);
            handleFirstClick(position);
            checkBlankCell(position);
            //visitedBlankCells.push({x: position.rowIndex, y: position.colIndex});
        } else if (isGameRunning) {
            if (!cells[position.rowIndex][position.colIndex].isFlagged) {
                handleOpenCell(position);
                checkBlankCell(position);
            }
        }
    }

    // Gestiona el primer click llamando a todos los métodos necesarios
    const handleFirstClick = (position) => {
        openStarterArea(position);
        generateMines();
        countNeighborMines();
        setIsGameRunning(true);
    }

    const checkWin = () => {
        const noMineCells = cells.flat().filter(cell => !cell.isMine);
        const isWin = noMineCells.every(cell => cell.isOpen);
        if (isWin) {
            console.log('You won');
            setIsTimerRunning(false);
            setIsGameRunning(false);
            setOpen(true);
            setResult('won');
        }
    }

    const checkLose = () => {
        const isLost = cells.flat().some(cell => cell.isMine && cell.isOpen);
        if (isLost) {
            console.log('You lost');
            setIsTimerRunning(false);
            setIsGameRunning(false);
            setOpen(true);
            setResult('lost');
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
        if (isGameRunning) {
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

    const handleCloseEndGameModal = () => {
        setOpen(false);
        setResult('');
    }

    return (
        <>
            <Box sx={containerStyle}>
                <Timer 
                    running={isTimerRunning}
                />
                <Box sx={[boardStyle, style]}>
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
                {isGameRunning
                    ?   <>
                            <Button onClick={handleReset} variant="contained" size="small" color="info">
                                Reset
                            </Button>
                            <h2>Mines left: {minesLeft}</h2>
                        </>
                    :   null
                }
                <EndGameModal 
                    open={open}
                    onClose={handleCloseEndGameModal}
                    result={result}
                />
            </Box>
        </>
    );
}