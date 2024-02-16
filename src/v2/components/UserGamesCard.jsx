import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { StaticCell } from "./StaticCell";


export const UserGamesCard = ({ data }) => {

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChangeTab = (event, value) => {
        setSelectedTab(value);
    }

    const containerStyle = {
        width: '500px',
        height: '650px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid black',
        borderRadius: '30px',
        backgroundColor: 'lightsteelblue',
    }

    const boardStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '442px',
        height: '442px'
    }

    console.log(data);

    return (
        <>
            <Box sx={containerStyle}>
                <h2>{data.username}</h2>
                <Tabs value={selectedTab} onChange={handleChangeTab}>
                    {data.games.map((game, index) => (
                        <Tab key={game.game_number} label={game.game_number} sx={{fontWeight: 'bold'}} />
                    ))}
                </Tabs>
                {data.games.map((game, index) => (
                    <Box 
                        key={game.game_number}
                        hidden={selectedTab + 1 !== game.game_number}
                    >
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <p style={{fontWeight: 'bold'}}>Score: {game.score}</p>
                            <p style={{fontWeight: 'bold'}}>Time: {game.time} seconds</p>
                        </Box>
                        <Box sx={boardStyle}>
                            {game.cells.map((row, rowIndex) => (
                                row.map((cell, colIndex) => (
                                    <StaticCell key={`${rowIndex}-${colIndex}`} cell={cell} size={16} />
                                ))
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}