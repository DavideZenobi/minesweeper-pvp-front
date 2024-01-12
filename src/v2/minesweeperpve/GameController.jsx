import { useEffect, useState } from "react";
import { gameConfigs } from "../utils/gameconfigs";
import { Config } from "./Config";
import { Box, Button } from "@mui/material";
import { Board } from "./Board";
import { useWebSocketContext } from "../contexts/WebSocketContext";
import { getSocket } from "../websocket/websocket";
import { Timer } from "./Timer";
import { MovementTimer } from "./MovementTimer";
import { FinalGameModal } from "./FinalGameModal";

const sideBox = {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
}

const container = {
    border: '2px solid black',
    borderRadius: '30px',
    backgroundColor: 'lightsteelblue',
    // paddingTop: '10px',
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingBottom: '20px',
}

export const GameController = () => {
    const { isWebSocketInit } = useWebSocketContext();

    const socket = getSocket();

    const [isLoading, setIsLoading] = useState(true);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [gameConfig, setGameConfig] = useState(gameConfigs['easy']);
    const [reset, setReset] = useState(false);
    const [newResponseData, setNewResponseData] = useState(null);
    const [minesLeft, setMinesLeft] = useState(gameConfig.minesQuantity);
    const [resetMovementTimer, setResetMovementTimer] = useState(false);
    const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
    const [result, setResult] = useState({}); // {status, score, time}

    /*useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/api/private/sse/', {withCredentials: true});

        eventSource.onmessage = (event) => {
            console.log(event.data);
        }
    }, []);*/
    
    useEffect(() => {
        if (isWebSocketInit) {
            socket.emit('create-minesweeper-pve-solo', () => {
                setIsLoading(false);
            });

            socket.on('game-finished', (result) => {
                setResult(result);
                setIsFinalModalOpen(true);
                setIsGameRunning(false);
            });
        }
    }, [isWebSocketInit]);

    const resetGame = () => {
        socket.emit('reset', () => {
            setIsGameRunning(false);
            setReset(!reset);
        });
    }   

    const handleConfigChange = (level) => {
        socket.emit('level-changed', (level), () => {
            setNewResponseData(null);
            setGameConfig(gameConfigs[level]);
            setIsGameRunning(false);
        });
    }

    const handleClick = (position, event) => {
        if (event !== undefined) {
            event.preventDefault();
            socket.emit('right-click-cell', (position), (responseData) => {
                if (responseData.length > 0) {
                    if (responseData[0].isFlagged) {
                        setMinesLeft(minesLeft - 1);
                    } else {
                        setMinesLeft(minesLeft + 1);
                    }
                    setNewResponseData(responseData);
                }
            });
        } else {
            socket.emit('left-click-cell', (position), (responseData) => {
                setResetMovementTimer(!resetMovementTimer);
                setIsGameRunning(true);
                if (responseData) {
                    setNewResponseData(responseData);
                }
            });
        }
        
    }

    if (isLoading) {
        return <h1>Loading game info...</h1>
    }

    return (
        <>  
            <Box sx={sideBox}>
                <Box sx={{ width: '200px', height: '50px', border: '2px solid black', borderRadius: '20px', backgroundColor: 'lightsteelblue', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Timer 
                        running={isGameRunning} 
                    />
                </Box>
                <Box sx={{ width: '200px', height: '50px', border: '2px solid black', borderRadius: '20px', backgroundColor: 'lightsteelblue', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MovementTimer
                        running={isGameRunning}
                        ownReset={resetMovementTimer}
                    />
                </Box>
                <Box sx={{ width: '200px', height: '50px', border: '2px solid black', borderRadius: '20px', backgroundColor: 'lightsteelblue', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontWeight: 'bold'}}>Mines left: {minesLeft}</p>
                </Box>
                <Box sx={{ width: '200px', height: '50px', border: '2px solid black', borderRadius: '20px', backgroundColor: 'lightsteelblue', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button onClick={resetGame} sx={{margin: '20px'}} variant="contained" color="warning" size="small">Reset</Button>
                </Box>
            </Box>
            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'row' }}>
                <Board
                    key={reset}
                    gameConfig={gameConfig}
                    onClick={handleClick}
                    newCells={newResponseData}
                />
            </Box>
            <Box sx={sideBox}>
                <Box sx={container}>
                    <Config
                        onChange={handleConfigChange}
                    />
                </Box>  
            </Box>
            <FinalGameModal 
                isOpen={isFinalModalOpen}
                result={result}
                setIsOpen={setIsFinalModalOpen}
            />
        </>
    );
}