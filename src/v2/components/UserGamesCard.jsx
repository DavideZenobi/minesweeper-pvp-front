import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { StaticCell } from "./StaticCell";


export const UserGamesCard = ({ data }) => {

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChangeTab = (event, value) => {
        setSelectedTab(value);
    }

    return (
        <>
            <div className="flex flex-col items-center border border-gray-600 rounded-sm w-112 bg-gray-800">
                <h2 className="text-slate-300 text-3xl">{data.username}</h2>
                <Tabs value={selectedTab} onChange={handleChangeTab}>
                    {data.games.map((game, index) => (
                        <Tab key={game.game_number} label={game.game_number} className="font-bold" />
                    ))}
                </Tabs>
                {data.games.map((game, index) => (
                    <div key={game.game_number} hidden={selectedTab + 1 !== game.game_number}>
                        <div className="flex justify-evenly text-slate-300">
                            <p className="font-bold">Score: {game.score}</p>
                            <p className="font-bold">Time: {game.time} seconds</p>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {game.cells.map((row, rowIndex) => (
                                row.map((cell, colIndex) => (
                                    <StaticCell key={`${rowIndex}-${colIndex}`} cell={cell} size={16} />
                                ))
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}