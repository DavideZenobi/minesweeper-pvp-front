import { Box } from "@mui/material"
import { GameController } from "../minesweeperpvp/GameController"


export const GamePvP = () => {

    return (
        <>
            <div className="flex flex-col h-full w-full">
                <GameController />
            </div>
        </>
    )
}