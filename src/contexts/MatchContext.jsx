import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MinesweeperLevels } from "../utils/MinesweeperLevels";
import { getRoomInfo } from "../api/privateApi";

/* 
const matchStatus = {
    countdown: 'countdown',
    running: 'running',
    waiting: 'waiting',
    readyNext: 'readyNext',
    resetting: 'resetting',
    interrupted: 'interrupted',
    finished: 'finished',
}

const matchConfig = {
    level: // easy, medium, hard
    type: // BO3, BO5, 2-4-8 players
}
*/
const MatchContext = createContext();

export const useMatchContext = () => useContext(MatchContext);

export const MatchProvider = ({ children, level = 'hard' }) => {
    const { roomId } = useParams();
    
    const [players, setPlayers] = useState();
    const [boardConfig, setBoardConfig] = useState(MinesweeperLevels[level]); // {cellsPerSide, mines}
    const [matchConfig, setMatchConfig] = useState();
    const [matchStatus, setMatchStatus] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRoomInfo(roomId);
            const { players } = await response.json();
            setPlayers(players);
            setTimeout(() => {
                setIsLoading(false);
            }, 1 * 1000);
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <h2>Loading match info...</h2>
    }

    return (
        <MatchContext.Provider value={{ matchStatus, boardConfig, players, setMatchStatus }}>
            { children }
        </MatchContext.Provider>
    )
}