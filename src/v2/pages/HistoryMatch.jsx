import { Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getGamesHistoryByMatchId } from "../api/privateApi";
import { UserGamesCard } from "../components/UserGamesCard";


export const HistoryMatch = () => {
    const { matchId } = useParams();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [usersGames, setUsersGames] = useState([]);

    useEffect(() => {
        const loadMatch = async () => {
            const response = await getGamesHistoryByMatchId(matchId);
            if (response.ok) {
                const newData = await response.json();
                console.log(newData);
                setUsersGames(newData);
                setIsLoading(false);
            } else {
                navigate('/404');
            }
            
        }

        loadMatch();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="flex justify-evenly items-center gap-x-12 w-full">
                {usersGames.map(userGame => (
                    <UserGamesCard
                        key={userGame.username}
                        data={userGame}
                    />
                ))}
            </div>
        </>
    )
}