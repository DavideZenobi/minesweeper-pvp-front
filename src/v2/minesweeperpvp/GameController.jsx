import { useEffect, useState } from "react";
import { useEventSourceContext } from "../contexts/EventSourceContext"
import { Avatar, Box, Button } from "@mui/material";
import { Board } from "./Board";
import { useNavigate, useParams } from "react-router-dom";
import { getMatchConfig, getMatchInfoForReconnect, getUserStatus, handleLeftClick, handleRightClick, userIsReady } from "../api/privateApi";
import { Timer } from "./Timer";
import { MovementTimer } from "./MovementTimer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FinalGameModal } from "./FinalGameModal";
import { Countdown } from "./Countdown";
import { OpponentsBoardModal } from "./OpponentsBoardModal";
import opener from '../utils/opener.wav';
import lose from '../utils/lose.wav';
import win from '../utils/win.wav';
import cellOpened from '../utils/cellOpened.wav';

const cloud = {
    width: '200px',
    height: '50px',
    border: '2px solid black',
    borderRadius: '20px',
    backgroundColor: 'lightsteelblue',
    textAlign: 'center', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center'
}

const leftContainer = {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
}

const rightContainer = {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const rightContentContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //rowGap: '20px',
    border: '2px solid black',
    borderRadius: '20px',
    backgroundColor: 'lightsteelblue',
    width: '300px',
    height: '500px'
}

const midContainer = {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
}

const midBox = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const userStatusEnum = {
    waitingToConnect: 'waitingToConnect',
    readyToStart: 'readyToStart',
    starting: 'starting',
    running: 'running',
    waiting: 'waiting',
    resetting: 'resetting',
    finished: 'finished',
}

export const GameController = () => {
    const { eventSource } = useEventSourceContext();

    const navigate = useNavigate();

    const { matchId } = useParams();

    // Match states
    const [usernames, setUsernames] = useState();
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [matchConfig, setMatchConfig] = useState({});
    const [currentGame, setCurrentGame] = useState(1);
    const [userStatus, setUserStatus] = useState();
    const [results, setResults] = useState([]);
    
    // Timer states
    const [resetMovementTimer, setResetMovementTimer] = useState(false);
    // Board states
    const [updatedCells, setUpdatedCells] = useState(null);
    const [minesLeft, setMinesLeft] = useState(0);
    // Modal states
    const [isFinalGameModalOpen, setIsFinalGameModalOpen] = useState(false);

    // Opponent states
    const [isOpponentsBoardOpen, setIsOpponentsBoardOpen] = useState(false);
    const [opponentsUpdatedCells, setOpponentsUpdatedCells] = useState(null);
    // Times updates states
    const [updatedTimer, setUpdatedTimer] = useState(null);
    const [updatedTimeToMove, setUpdatedTimeToMove] = useState(null);
    const [updatedTimeToStart, setUpdatedTimeToStart] = useState(null);
    const [updatedTimeToNextGame, setUpdatedTimeToNextGame] = useState(null);
    

    // Si entra por primera vez da el 'OK' para informar de que está listo
    // Si no es la primera vez, gestiona una reconexión solicitando los datos y el estado de la partida al servidor
    useEffect(() => {
        const init = async () => {

            const configResponse = await getMatchConfig(matchId);
            if (configResponse.ok) {
                const data = await configResponse.json();
                setMatchConfig(data);
                setMinesLeft(data.minesQuantity)
            }

            const response = await getUserStatus(matchId);
            if (response.ok) {
                const { status } = await response.json();
                if (status === userStatusEnum.waitingToConnect) { // La primera vez que se conecta
                    const response = await userIsReady(matchId);
                    if (response.ok) {
                        setIsDataLoading(false);
                    }
                } else { // Es una reconexión
                    const response = await getMatchInfoForReconnect(matchId);
                    if (response.ok) {
                        const { data } = await response.json();
                        
                        switch (data.userStatus) {
                            case userStatusEnum.readyToStart:
                                setUsernames(data.usernames);
                                setUserStatus(data.userStatus);
                                break;
                            case userStatusEnum.starting:
                                setUsernames(data.usernames);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setUpdatedTimeToStart(data.timeToStart);
                                break;
                            case userStatusEnum.running:
                                setUsernames(data.usernames);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setUpdatedCells(data.cells);
                                setMinesLeft(data.minesLeft);
                                setUpdatedTimer(data.time);
                                setUpdatedTimeToMove(data.timeToMove);
                                setIsGameRunning(true);
                                break;
                            case userStatusEnum.waiting:
                                setUsernames(data.usernames);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setUpdatedCells(data.cells);
                                setMinesLeft(data.minesLeft);
                                setUpdatedTimer(data.time);
                                setUpdatedTimeToMove(data.timeToMove);
                                break;
                            case userStatusEnum.resetting:
                                setUsernames(data.usernames);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setUpdatedCells(data.cells);
                                setMinesLeft(data.minesLeft);
                                setUpdatedTimer(data.time);
                                setUpdatedTimeToMove(data.timeToMove);
                                setUpdatedTimeToNextGame(data.timeToNextGame);
                                setResults(data.results);
                                break;
                            default:
                                break;
                        }
                        setIsDataLoading(false);
                    }
                }
            }
        }

        init();
    }, []);

    useEffect(() => {
        if (eventSource) {
            eventSource.addEventListener('match-started', handleMatchStarted);
            eventSource.addEventListener('game-started', handleGameStarted);
            eventSource.addEventListener('game-finished', handleGameFinished); 
            eventSource.addEventListener('all-games-finished', handleAllGamesFinished);
            eventSource.addEventListener('preparing-next-game', handlePreparingNextGame); 
            eventSource.addEventListener('reset-game', handleResetGame); 
            eventSource.addEventListener('match-finished', handleMatchFinished);
            eventSource.addEventListener('update-time', handleUpdateTime);
            eventSource.addEventListener('update-opponents-cells', handleOpponentsUpdatedCells);
        }

        return () => {
            if (eventSource) {
                eventSource.removeEventListener('match-started', handleMatchStarted);
                eventSource.removeEventListener('game-started', handleGameStarted);
                eventSource.removeEventListener('game-finished', handleGameFinished);
                eventSource.removeEventListener('all-games-finished', handleAllGamesFinished);
                eventSource.removeEventListener('preparing-next-game', handlePreparingNextGame); 
                eventSource.removeEventListener('reset-game', handleResetGame);
                eventSource.removeEventListener('match-finished', handleMatchFinished);
                eventSource.removeEventListener('update-time', handleUpdateTime);
                eventSource.removeEventListener('update-opponents-cells', handleOpponentsUpdatedCells);
            }
        }

    }, [eventSource]);

    /**
     * Eventos
     */
    const handleMatchStarted = () => {
        setUserStatus(userStatusEnum.starting);
    }

    const handleGameStarted = () => {
        setIsGameRunning(true);
        setUserStatus(userStatusEnum.running);
    }

    const handleGameFinished = () => {
        const loseAudio = new Audio(lose);
        loseAudio.play();
        setIsGameRunning(false); 
        setUserStatus(userStatusEnum.waiting);
    }

    const handleAllGamesFinished = (event) => {
        setResults(JSON.parse(event.data));
        setIsFinalGameModalOpen(true);
    }

    const handlePreparingNextGame = () => {
        setUserStatus(userStatusEnum.resetting);
    }

    const handleResetGame = () => {
        setUpdatedTimeToNextGame(null);
        setUpdatedTimeToStart(null);
        setUpdatedTimeToMove(null);
        setUpdatedTimer(null);
        setUpdatedCells(null);
        setCurrentGame((prevCurrentGame) => prevCurrentGame + 1);
        setMinesLeft(95);
        setIsFinalGameModalOpen(false);
        setUserStatus(userStatusEnum.starting);
    }

    const handleMatchFinished = () => {
        setUserStatus(userStatusEnum.finished);
    }

    const handleUpdateTime = (event) => {
        const data = event.data;
        switch (data.userStatus) {
            case userStatusEnum.starting:
                setUpdatedTimeToStart(data.time);
                break;
            case userStatusEnum.running:
                setUpdatedTimer(data.time);
                setUpdatedTimeToMove(data.timeToMove);
                break;
            case userStatusEnum.resetting:
                setUpdatedTimeToNextGame(data.time);
                break;
            default:
                break;
        }
    }

    const handleOpponentsUpdatedCells = (event) => {
        setOpponentsUpdatedCells(JSON.parse(event.data));
    }

/************************************************************************
 ************************************************************************/

    const handleOnClick = async (position, event) => {
        if (event) {
            event.preventDefault();
        }
        if (isGameRunning) {
            if (event) {
                const response = await handleRightClick(matchId, position);
                if (response.ok) {
                    const updatedCells = await response.json();
                    setUpdatedCells(updatedCells.data);
                    const flaggedCellsCounter = updatedCells.data.filter(updatedCell => updatedCell.isFlagged).length;
                    setMinesLeft(matchConfig.minesQuantity - flaggedCellsCounter);
                }
            } else {
                const response = await handleLeftClick(matchId, position);
                if (response.ok) {
                    const sound = new Audio(opener);
                    sound.volume = 0.1;
                    sound.play();
                    const updatedCells = await response.json();
                    setResetMovementTimer(!resetMovementTimer);
                    setUpdatedCells(updatedCells.data);
                }
            }
        }
    }

    const handleOnZeroCountdown = () => {
        navigate('/home');
    }

    return (
        <>
            {isDataLoading
                ?   <h2>Loading...</h2>
                :   <>
                        <Box sx={leftContainer}>
                            <Box sx={cloud}>
                                <Timer
                                    key={currentGame}
                                    running={isGameRunning}
                                    reconnectionTime={updatedTimer}
                                />
                            </Box>
                            <Box sx={cloud}>
                                <MovementTimer
                                    key={currentGame}
                                    running={isGameRunning} 
                                    reset={resetMovementTimer}
                                    updatedTimeToMove={updatedTimeToMove}
                                />
                            </Box>
                            <Box sx={cloud}>
                                <p style={{fontWeight: 'bold'}}>Mines left: {minesLeft}</p>
                            </Box>
                        </Box>
                        <Box sx={midContainer}>
                            <Box sx={midBox}>
                                <Board 
                                    key={currentGame}
                                    gameConfig={matchConfig}
                                    onClick={handleOnClick}
                                    updatedCells={updatedCells}
                                />
                            </Box>
                        </Box>
                        <Box sx={rightContainer}>
                            <Box sx={rightContentContainer}>
                                <h1>Match info</h1>
                                <h2>Status: Running</h2>
                                <p style={{fontWeight: 'bold'}}>Current game: {currentGame}</p>
                                <Box sx={{
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                    <p>User</p>
                                    <p>0</p>
                                    <p>-</p>
                                    <p>0</p>
                                    <p>User 2</p>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </Box>
                                {userStatus === userStatusEnum.waiting
                                    ?   <>
                                            <h2>Waiting for opponent</h2>
                                            <Button variant="contained" onClick={() => setIsOpponentsBoardOpen(true)}>Opponent Board</Button>
                                        </>
                                    :   null
                                }
                                {userStatus === userStatusEnum.resetting
                                    ?   <>
                                            <h2>Resets in <Countdown running={true} startTime={20} reconnectionTime={updatedTimeToNextGame}/></h2>
                                            <Button variant="contained" onClick={() => setIsFinalGameModalOpen(true)}>Results</Button>
                                            <Button variant="contained" onClick={() => setIsOpponentsBoardOpen(true)}>Opponent Board</Button>
                                        </>
                                    :   null
                                }
                                {userStatus === userStatusEnum.starting
                                    ?   <h2>Starts in <Countdown running={true} startTime={5} reconnectionTime={updatedTimeToStart} /></h2>
                                    :   null
                                }
                                {userStatus === userStatusEnum.finished
                                    ?   <h2>Exiting match in <Countdown running={true} startTime={60} onFinish={handleOnZeroCountdown} /></h2>
                                    :   null
                                }
                            </Box>
                        </Box>
                        <FinalGameModal 
                            isOpen={isFinalGameModalOpen}
                            setIsOpen={setIsFinalGameModalOpen}
                            usersResults={results}
                        />
                        <OpponentsBoardModal 
                            key={currentGame}
                            isOpen={isOpponentsBoardOpen}
                            setIsOpen={setIsOpponentsBoardOpen}
                            gameConfig={matchConfig}
                            updatedCells={opponentsUpdatedCells}
                        />
                    </>
            }
        </>
    )
}