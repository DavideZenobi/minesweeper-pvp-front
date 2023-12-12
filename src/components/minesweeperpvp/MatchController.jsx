import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocketContext } from "../../contexts/WebSocketContext";
import { getSocket } from "../../utils/WebSocket";
import { Countdown } from "./Countdown";
import { CustomSnackbar } from "../CustomSnackbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMatchContext } from "../../contexts/MatchContext";
import { Board } from './Board';
import { Box, Button } from "@mui/material";
import { ScoreModal } from "./ScoreModal";
import { InterruptModal } from "./InterruptModal";
import { OpponentBoard } from "./OpponentBoard";

export const MatchController = () => {
    const navigate = useNavigate();

    const matchStatusRef = useRef();

    const { user } = useAuthContext();
    const { matchStatus, setMatchStatus } = useMatchContext();
    const { isWebSocketInit } = useWebSocketContext();
    const socket = getSocket();

    const [snackbarData, setSnackbarData] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const [winOrLose, setWinOrLose] = useState();
    const [gameStats, setGameStats] = useState();
    const [gameNumber, setGameNumber] = useState(1);

    // Cuenta atrás para resetear la partida
    const [isResetCountdownOpen, setIsResetCountdownOpen] = useState(false);
    // Cuenta atrás para que empiece la partida
    const [isCountdownOpen, setIsCountdownOpen] = useState(false);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
    const [isInterruptModalOpen, setIsIntteruptModalOpen] = useState(false);
    const [isOpponentBoardOpen, setIsOpponentBoardOpen] = useState(false);
    const [isOpponentBoardButtonDisabled, setIsOpponentBoardButtonDisabled] = useState(true);

    useEffect(() => {
        if (isWebSocketInit) {
            // El usuario ya ha renderizado la página y envia al servidor que está listo
            socket.emit('user-ready');

            // El usuario recibe el evento de que todos los usuarios están listos y empieza la cuenta atrás para la siguiente partida
            socket.on('all-users-ready-to-start', () => {
                setMatchStatus('countdown');
            });

            // Evento indicando que todos los usuarios han terminado su partida
            socket.on('all-users-finished-game', () => {
                setMatchStatus('resetting');
            });

            // Evento indicando que todos los usuarios están listos y empieza la cuenta atrás para resetear
            socket.on('all-users-ready-next', () => {
                setMatchStatus('countdown');
                setGameNumber(prevGameNumber => prevGameNumber + 1);
            });

            socket.on('game-result', (results) => {
                setGameStats(results);

                const winner = results.reduce((max, current) => (max.results[gameNumber - 1].score > current.results[gameNumber - 1].score ? max : current), results[0]);
                if (winner.username === user.username) {
                    setWinOrLose('win');
                } else {
                    setWinOrLose('lose');
                }
            });

            // Evento indicando que se ha terminado el partido
            socket.on('match-finished', () => {
                setMatchStatus('finished')
            });

            // En caso de que algún jugador no pueda conectarse, se haya salido de la sala, etc...
            socket.on('player-left', () => {
                setMatchStatus('interrupted');
                setIsIntteruptModalOpen(true);
            });
        }
    }, [isWebSocketInit]);

    useEffect(() => {
        console.log(matchStatus);
        switch (matchStatus) {
            case 'countdown':
                setIsScoreModalOpen(false);
                setIsCountdownOpen(true);
                break;

            case 'running':
                setIsOpponentBoardButtonDisabled(false);
                break;

            case 'waiting':
                setIsOpponentBoardButtonDisabled(false);
                break;

            case 'resetting':
                setIsOpponentBoardButtonDisabled(true);
                setIsScoreModalOpen(true);
                setIsResetCountdownOpen(true);
                break;

            case 'interrupted':
                setIsScoreModalOpen(true);
                break;

            case 'finished':
                setIsOpponentBoardButtonDisabled(true);
                setIsScoreModalOpen(true);
                break;

            default:

                break;
        }
    }, [matchStatus]);

    // Este useEffect solo es para la recarga de página, con F5, cambio de url manual, etc
    // No sirve en caso de cambio de ruta de forma interna, haciendo click en algún link. Es decir, sin recarga de página.
    useEffect(() => { 
        const emitPlayerLeftEvent = () => {
            
            if (matchStatus === 'interrupted' || matchStatus === 'finished') {
                socket.emit('player-left-correctly');
            } else {
                socket.emit('player-left');
            }
        }
        
        window.addEventListener('beforeunload', emitPlayerLeftEvent);
        return () => {
            window.removeEventListener('beforeunload', emitPlayerLeftEvent);
        }
    }, [matchStatus]);

    // Asigna el status del partido al ref para poder usarlo en el useEffect de abajo.
    useEffect(() => {
        matchStatusRef.current = matchStatus;
    }, [matchStatus]);

    // Este useEffect gestiona el status del usuario en la sala cuando cambia de ruta de forma interna sin llegar a recargar la página.
    useEffect(() => {
        return () => {
            if (matchStatusRef.current === 'interrupted' || matchStatusRef.current === 'finished') {
                socket.emit('player-left-correctly');
            } else {
                socket.emit('player-left');
            }
        }
    }, []);

    const closeCountdown = () => {
        setIsCountdownOpen(false);
        handleStartGame();
    }

    const handleCloseSnackbar = () => {
        setSnackbarData({
            open: false,
            severity: 'success',
            message: '',
        });
    }

    const handleStartGame = () => {
        setMatchStatus('running');
    }

    const handleFinishGame = (data) => {
        // Si el usuario ha terminado la partida, envía el evento al servidor de que ha terminado y está a la espera
        socket.emit('user-finished-game', (data));
        setMatchStatus('waiting');
    }

    const handleStopResetCountdown = () => {
        setIsResetCountdownOpen(false);
        socket.emit('user-ready-next');
    }

    const handleCloseScoreModal = () => {
        setIsScoreModalOpen(false);
        if (matchStatus === 'interrupted' || matchStatus === 'finished') {
            setSnackbarData({
                open: true,
                severity: 'info',
                message: 'Redirecting to home...'
            });
            setTimeout(() => {
                navigate('/home');
            }, 2 * 1000);
        }
    }

    const handleCloseInterruptModal = () => {
        setTimeout(() => {
            setIsIntteruptModalOpen(false);
            navigate('/home');
        }, 2 * 1000);
    }

    const sendBoardUpdate = (cells) => {
        socket.emit('board-update', cells);
    }

    return (
        <>
            <h3>Game Number: {gameNumber}</h3>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100px',
            }}>
                {matchStatus === 'waiting'
                    ?   <p>Waiting for opponents to finish...</p>
                    :   null
                }
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                }}>
                    {matchStatus === 'resetting'
                        ?   <>
                                <p>Loading next match:</p>
                                <Countdown open={isResetCountdownOpen} handleFinish={handleStopResetCountdown} time={20} />
                            </>
                        :   null
                    }
                    {matchStatus === 'countdown'
                        ?   <>
                                <p>Starts in:</p>
                                <Countdown open={isCountdownOpen} handleFinish={closeCountdown} />
                            </>
                        :   null
                    }
                </Box>
                {matchStatus === 'running' || matchStatus === 'waiting'
                    ?   <Button
                            onClick={() => setIsOpponentBoardOpen(true)}
                            variant="contained"
                            color="info"
                            disabled={isOpponentBoardButtonDisabled}
                        >
                            Opponent's board
                        </Button>
                    :   null
                }
                
            </Box>
            <Board
                //key={gameNumber}
                onFinish={handleFinishGame}
                sendBoardUpdate={sendBoardUpdate}
            />
            <OpponentBoard
                key={gameNumber}
                open={isOpponentBoardOpen}
                onClose={() => setIsOpponentBoardOpen(false)}
            />
            <ScoreModal 
                isOpen={isScoreModalOpen} 
                onClose={handleCloseScoreModal}
                stats={gameStats}
                gameResult={winOrLose}
                gameNumber={gameNumber}
            />
            <InterruptModal 
                open={isInterruptModalOpen}
                onClose={handleCloseInterruptModal}
            />
            <CustomSnackbar
                open={snackbarData.open}
                severity={snackbarData.severity}
                message={snackbarData.message}
                onClose={handleCloseSnackbar}
            />
        </>
    );
}