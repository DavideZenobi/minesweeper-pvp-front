import { useEffect, useState } from "react";
import { changeLevel, createGamePvE, deleteGamePvE, leftClick, rightClick } from "../api/privateApi";
import { Board } from "./Board";
import { BoardInfo } from "./BoardInfo";
import { useEventSourceContext } from "../contexts/EventSourceContext";
import { gameConfigs } from "../utils/gameconfigs";
import { FinalGameModal } from "./FinalGameModal";

export const GameController = () => {
    const { eventSource } = useEventSourceContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [firstClicked, setFirstClicked] = useState(false);
    const [updatedCells, setUpdatedCells] = useState();
    const [resetMoveTimer, setResetMoveTimer] = useState(false);
    const [minesLeft, setMinesLeft] = useState(gameConfigs['easy'].minesQuantity);
    const [selectedLevel, setSelectedLevel] = useState('easy');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const create = async () => {
            const response = await createGamePvE();
            if (response.ok) {
                setIsLoading(false);
                setIsGameRunning(true);
            }
        }
    
        create();
        return () => {
            deleteGamePvE();
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
    const handleGameFinished = () => {
        setIsGameRunning(false);
        setFirstClicked(false);
        setOpenModal(true);
    }

    const handleLostByTime = () => {
        setIsGameRunning(false);
        setFirstClicked(false);
        setOpenModal(true);
    }


    /**
     * ****************************************************************
     */


    const handleLevelChange = async (level) => {
        const response = await changeLevel(level);
    }

    const handleClick = async (position, event) => {
        if (event) {
            event.preventDefault();
        }

        if (isGameRunning) {
            if (event) {
                const response = await rightClick(position);
                if (response.ok) {
                    const data = await response.json();
                    setUpdatedCells(data);
                    if (data[0].isFlagged) {
                        setMinesLeft(minesLeft - 1);
                    } else {
                        setMinesLeft(minesLeft + 1);
                    }
                }
                
            } else {
                const response = await leftClick(position);
                if (response.ok) {
                    const data = await response.json();
                    setFirstClicked(true);
                    setUpdatedCells(data);
                    setResetMoveTimer(!resetMoveTimer);
                }
                
            }
        }
    }

    if (isLoading) {
        return <h1>Loading game info...</h1>
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
                    />
                </div>
                <div>
                    <Board
                        onClick={handleClick}
                        newCells={updatedCells}
                    />
                </div>
                <div>
                    <div className="flex justify-center items-center w-24 border border-black rounded-sm bg-green-800 hover:bg-green-700 cursor-pointer shadow-xl">
                        <p className="text-slate-300">Reset</p>
                    </div>
                </div>
                <FinalGameModal 
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                />
            </div>
        </>
    );
}