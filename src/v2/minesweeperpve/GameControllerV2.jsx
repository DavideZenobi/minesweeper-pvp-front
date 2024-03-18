import { useEffect, useState } from "react"
import { createGamePvEOffline, leftClickGamePvEOffline, levelChangeGamePvEOffline, resetGamePvEOffline, rightClickGamePvEOffline } from "../api/publicApi";
import { useAudioSettingsContext } from "../contexts/AudioSettingsContext";
import { useEventSourceContext } from "../contexts/EventSourceContext";
import { gameConfigs } from "../utils/gameconfigs";
import { BoardInfo } from "./BoardInfo";
import { Board } from "./Board";
import { FinalGameModal } from "./FinalGameModal";


export const GameControllerV2 = () => {
    //const { eventSource } = useEventSourceContext();
    const { playAudio } = useAudioSettingsContext();

    const [matchId, setMatchId] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [firstClicked, setFirstClicked] = useState(false);
    const [resetMoveTimer, setResetMoveTimer] = useState(false);
    const [minesLeft, setMinesLeft] = useState(gameConfigs['easy'].minesQuantity);
    const [selectedLevel, setSelectedLevel] = useState('easy');
    const [cells, setCells] = useState(
        Array.from({ length: gameConfigs[selectedLevel].squaresPerHeight }, (_unused, rowIndex) => 
            Array.from({ length: gameConfigs[selectedLevel].squaresPerWidth }, (__unused, colIndex) => (
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
    const [openModal, setOpenModal] = useState(false);
    const [results, setResults] = useState({});
    const [reset, setReset] = useState(false);

    const [eventSource, setEventSource] = useState(null);

    useEffect(() => {
        let eventSource;
        const create = async () => {
            const response = await createGamePvEOffline();
            if (response.ok) {
                const data = await response.json();
                setMatchId(data);
                setIsGameRunning(true);
                eventSource = new EventSource(`${process.env.REACT_APP_PUBLIC_API_URL}/sse/offline/${data}`);
                setEventSource(eventSource);
                setIsLoading(false);
            }
        }

        create();

        return () => {
            if (eventSource) {
                eventSource.close();
            }
        }
    }, []);

    useEffect(() => {
        if (eventSource) {
            eventSource.addEventListener('game-finished', handleGameFinished);
            eventSource.addEventListener('lost-by-time', handleLostByTime);
            return () => {
                eventSource.removeEventListener('game-finished', handleGameFinished);
                eventSource.removeEventListener('lost-by-time', handleLostByTime);
            }
        }
    }, [eventSource]);

    /**
     * Eventos SSE
     */
    
    const handleGameFinished = (event) => {
        setIsGameRunning(false);
        setFirstClicked(false);
        setOpenModal(true);
        setResults(JSON.parse(event.data));
    }

    const handleLostByTime = (event) => {
        setIsGameRunning(false);
        setFirstClicked(false);
        setOpenModal(true);
        setResults(JSON.parse(event.data));
    }

    /**
     * ****************************************************************
     */

    const handleLevelChange = async (level) => {
        const response = await levelChangeGamePvEOffline(matchId, level);
        if (response.ok) {
            setIsGameRunning(true);
            setFirstClicked(false);
            setSelectedLevel(level);
            setMinesLeft(gameConfigs[level].minesQuantity);
            resetCells(level);
            setReset(!reset);
        }
    }

    const handleReset = async () => {
        const response = await resetGamePvEOffline(matchId);
        if (response.ok) {
            setIsGameRunning(true);
            setFirstClicked(false);
            setMinesLeft(gameConfigs[selectedLevel].minesQuantity);
            resetCells();
            setReset(!reset);
            setResults({});
        }
    }

    const resetCells = (level = selectedLevel) => {
        setCells(
            Array.from({ length: gameConfigs[level].squaresPerHeight }, (_unused, rowIndex) => 
                Array.from({ length: gameConfigs[level].squaresPerWidth }, (__unused, colIndex) => (
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

    const handleClick = async (position, event) => {
        if (event) {
            event.preventDefault();
        }

        if (isGameRunning) {
            if (event && firstClicked) {
                const response = await rightClickGamePvEOffline(matchId, position);
                if (response.ok) {
                    const data = await response.json();
                    handleSetCells(data);
                    if (data[0].isFlagged) {
                        setMinesLeft(minesLeft - 1);
                    } else {
                        setMinesLeft(minesLeft + 1);
                    }
                }
                
            } else {
                const response = await leftClickGamePvEOffline(matchId, position);
                if (response.ok) {
                    playAudio();
                    const data = await response.json();
                    setFirstClicked(true);
                    handleSetCells(data);
                    setResetMoveTimer(!resetMoveTimer);
                }
                
            }
        }
    }

    if (isLoading) {
        return <h2>Loading data...</h2>
    }

    return (
        <>
            <div className="flex flex-col justify-start items-center gap-y-10 w-full">
                <div className="mt-10">
                    <BoardInfo
                        hasGameStarted={isGameRunning && firstClicked}
                        updatedMinesLeft={minesLeft}
                        selectedLevel={selectedLevel}
                        onLevelChange={handleLevelChange}
                        onCellLeftClicked={resetMoveTimer}
                        reset={reset}
                    />
                </div>
                <div>
                    <Board
                        cells={cells}
                        level={selectedLevel}
                        onClick={handleClick}
                    />
                </div>
                <div>
                    <div onClick={handleReset} className="flex justify-center items-center w-24 border border-black transition-colors rounded-sm bg-green-800 hover:bg-green-700 cursor-pointer shadow-xl">
                        <p className="text-slate-300">Reset</p>
                    </div>
                </div>
                <FinalGameModal isOpen={openModal} onClose={() => setOpenModal(false)} result={results} />
            </div>
        </>
    )
}