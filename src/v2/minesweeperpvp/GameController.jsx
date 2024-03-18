import { useEffect, useState } from "react";
import { useEventSourceContext } from "../contexts/EventSourceContext"
import { Avatar, Box, Button } from "@mui/material";
import { Board } from "./Board";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMatchConfig, getMatchInfoForReconnect, getUserStatus, handleLeftClick, handleRightClick, userIsReady } from "../api/privateApi";
import { Timer } from "./Timer";
import { MovementTimer } from "./MovementTimer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FinalGameModal } from "./FinalGameModal";
import { Countdown } from "./Countdown";
import { OpponentsBoardModal } from "./OpponentsBoardModal";
import { BoardInfo } from "./BoardInfo";
import { gameConfigs } from "../utils/gameconfigs";

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

    const { state } = useLocation();

    // Match states
    const [users, setUsers] = useState([
        {username: state[0], wins: 0},
        {username: state[1], wins: 0}
    ]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [matchConfig, setMatchConfig] = useState({});
    const [currentGame, setCurrentGame] = useState(1);
    const [userStatus, setUserStatus] = useState();
    const [results, setResults] = useState([]);
    const [cells, setCells] = useState(
        Array.from({ length: gameConfigs['hard'].squaresPerHeight }, (_unused, rowIndex) => 
            Array.from({ length: gameConfigs['hard'].squaresPerWidth }, (__unused, colIndex) => (
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
    
    // Timer states
    const [resetMovementTimer, setResetMovementTimer] = useState(false);
    // Board states
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
                                setUsers(data.users);
                                setUserStatus(data.userStatus);
                                break;
                            case userStatusEnum.starting:
                                setUsers(data.users);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setUpdatedTimeToStart(data.timeToStart);
                                break;
                            case userStatusEnum.running:
                                setUsers(data.users);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setCells(data.cells);
                                setMinesLeft(data.minesLeft);
                                setUpdatedTimer(data.time);
                                setUpdatedTimeToMove(data.timeToMove);
                                setIsGameRunning(true);
                                break;
                            case userStatusEnum.waiting:
                                setUsers(data.users);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setCells(data.cells);
                                setMinesLeft(data.minesLeft);
                                setUpdatedTimer(data.time);
                                setUpdatedTimeToMove(data.timeToMove);
                                break;
                            case userStatusEnum.resetting:
                                setUsers(data.users);
                                setUserStatus(data.userStatus);
                                setCurrentGame(data.currentGame);
                                setCells(data.cells);
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
        setIsGameRunning(false); 
        setUserStatus(userStatusEnum.waiting);
    }

    const handleAllGamesFinished = (event) => {
        const data = JSON.parse(event.data);
        setUsers(prevUsers => (
            prevUsers.map(prevUser => {
                const matchingUser = data.find(user => user.username === prevUser.username);
                if (matchingUser) {
                    return {...prevUser, wins: matchingUser.wins}
                } else {
                    return prevUser;
                }
            })
        ))
        setResults(data);
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
        resetCells();
        setCurrentGame((prevCurrentGame) => prevCurrentGame + 1);
        setMinesLeft(95);
        setIsFinalGameModalOpen(false);
        setIsOpponentsBoardOpen(false);
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
                    handleSetCells(updatedCells);
                    const totalCellsFlagged = updatedCells.filter(updatedCell => updatedCell.isFlagged === true).length;
                    setMinesLeft(95 - totalCellsFlagged);
                }
            } else {
                const response = await handleLeftClick(matchId, position);
                if (response.ok) {
                    const updatedCells = await response.json();
                    setResetMovementTimer(!resetMovementTimer);
                    handleSetCells(updatedCells);
                }
            }
        }
    }

    const resetCells = () => {
        setCells(
            Array.from({ length: gameConfigs['hard'].squaresPerHeight }, (_unused, rowIndex) => 
                Array.from({ length: gameConfigs['hard'].squaresPerWidth }, (__unused, colIndex) => (
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
    }
    
    const handleSetCells = (newCells) => {
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

    const handleOnZeroCountdown = () => {
        navigate('/multiplayer');
    }

    if (isDataLoading) {
        return <h2 className="text-3xl text-slate-300">Loading...</h2>
    }

    return (
        <>
            <div className="flex justify-evenly">
                <BoardInfo
                    key={currentGame}
                    hasGameStarted={isGameRunning}
                    updatedMinesLeft={minesLeft}
                    reset={resetMovementTimer}
                    onCellLeftClicked={updatedTimeToMove}
                />
                <div className="flex flex-col text-slate-300">
                    <h2 className="text-2xl">Match info</h2>
                    <h4 className="text-lg">Status: </h4>
                    <p>Game: {currentGame}</p>
                    <p>{users[0].username} {users[0].wins} -- {users[1].wins} {users[1].username}</p>
                </div>
            </div>
            <div className="flex justify-center h-20 text-slate-300">
                {userStatus === userStatusEnum.waiting
                    ?   <>
                            <div className="flex gap-x-5 items-center">
                                <h2 className="text-2xl">Waiting for opponent</h2>
                                <div onClick={() => setIsOpponentsBoardOpen(true)} className="bg-blue-500 hover:bg-blue-400 rounded-md p-2 cursor-pointer">Opponent board</div>
                            </div> 
                        </>
                    : null
                }
                {userStatus === userStatusEnum.resetting
                    ?   <>
                            <div className="flex gap-x-5 items-center">
                                <h2 className="text-2xl">Resets in</h2>
                                <Countdown running={true} startTime={20} reconnectionTime={updatedTimeToNextGame} />
                                <div onClick={() => setIsFinalGameModalOpen(true)} className="bg-blue-500 hover:bg-blue-400 rounded-md p-2 cursor-pointer">Results</div>
                                <div onClick={() => setIsOpponentsBoardOpen(true)} className="bg-blue-500 hover:bg-blue-400 rounded-md p-2 cursor-pointer">Opponent board</div>
                            </div>
                        </>
                    : null
                }
                {userStatus === userStatusEnum.starting
                    ?   <>
                            <div className="flex gap-x-5 items-center">
                                <h2 className="text-2xl">Starts in</h2>
                                <Countdown running={true} startTime={5} reconnectionTime={updatedTimeToStart} />
                            </div>
                        </>
                    : null
                }
                {userStatus === userStatusEnum.finished
                    ?   <>
                            <div className="flex gap-x-5 items-center">
                                <h2 className="text-2xl">Exiting match in</h2>
                                <Countdown running={true} startTime={60} onFinish={handleOnZeroCountdown} />
                            </div>
                        </>
                    : null
                }
            </div>
            <div className="h-full flex justify-center items-center">
                <Board
                    key={currentGame}
                    cells={cells}
                    onClick={handleOnClick}
                />
            </div>
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
    )
}