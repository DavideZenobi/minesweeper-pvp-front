import { Box, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getGamesHistoryByMatchId } from "../api/privateApi";
import { UserGamesCard } from "../components/UserGamesCard";


export const HistoryMatch = () => {
    const { matchId } = useParams();

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
            }
            
        }

        loadMatch();
    }, []);

    const containerStyle = {
        width: '700px',
        height: '550px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //rowGap: '20px',
        border: '2px solid black',
        borderRadius: '30px',
        backgroundColor: 'lightsteelblue',
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <Box>
                hola
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100%', columnGap: '50px' }}>
                {usersGames.map(userGame => (
                    <UserGamesCard 
                        key={userGame.username}
                        data={userGame}
                    />
                ))}
            </Box>
        </>
    )
}