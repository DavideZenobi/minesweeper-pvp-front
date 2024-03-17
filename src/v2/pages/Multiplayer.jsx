import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Chronometer } from "../components/Chronometer";
import { useUserQueueContext } from "../contexts/UserQueueContext";
import { useState } from "react";

export const Multiplayer = () => {
    const navigate = useNavigate();

    const { isInQueue, join, remove } = useUserQueueContext();

    const handleJoinQueue = async () => {
        const response = await join();
        if (response.ok) {

        }
    }

    const handleLeaveQueue = async () => {
        const response = await remove();
        if (response.ok) {

        }
    }
    
    return (
        <>
            <div className="size-full flex justify-center items-center">
                <div className="max-w-140 p-4 border border-black flex flex-col gap-y-2 items-center bg-gray-800 text-slate-300">
                    <h2 className="text-3xl">Multiplayer</h2>
                    <p>Play against other players from around the world in an exciting best-of-three game</p>
                    <h4 className="text-xl">Rules</h4>
                    <div className="w-full ml-10 flex flex-col justify-start">
                        <ul className="list-disc list-outside">
                            <li>The match will be a best of 3</li>
                            <li>Players have 30 seconds to perform each move. If no move is made, the game of the player who has not moved will be over.</li>
                            <li>
                                Scoring rules:
                                <ul className="list-square ml-10">
                                    <li>Each open cell that is not a mine counts 2 points</li>
                                    <li>Each unopened cell that is a mine and is flagged will be 0.2 points</li>
                                    <li>If the player completes the board, a multiplier will be applied to the final score depending on the time taken, which will vary between 1 and 2.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <hr width='100%' />
                    { isInQueue
                        ?   <div
                                onClick={handleLeaveQueue} 
                                className="bg-blue-500 hover:bg-red-600 font-bold px-4 py-1  rounded-md cursor-pointer text-center align-middle"
                            >
                                Searching...
                            </div>
                        :   <div 
                                onClick={handleJoinQueue} 
                                className="bg-green-700 hover:bg-green-600 active:bg-orange-500 shadow-sm shadow-green-700 font-bold px-4 py-1  rounded-md cursor-pointer text-center align-middle"
                            >
                                Join Queue
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

/*
<Box sx={style}>
                <Box sx={containerStyle}>
                    <h3>Minesweeper PvP</h3>
                    { isInQueue
                        ?   <Button 
                                onClick={handleLeaveQueue} 
                                variant="contained" 
                                size="small" 
                                color="success"
                            >
                                <Chronometer />
                            </Button>
                        :   <Button 
                                onClick={handleJoinQueue} 
                                variant="contained" 
                                size="small" 
                                color="success"
                            >
                                Join queue
                            </Button>
                    }
                </Box>
            </Box>*/