import { gameConfigs } from "../utils/gameconfigs";
import { Timer } from "./Timer";
import { Countdown } from "../components/Countdown";


export const BoardInfo = ({ hasGameStarted = false, updatedMinesLeft = 95, reset, onCellLeftClicked }) => {

    return (
        <>
            <div className="flex flex-col items-center gap-y-3 min-w-56 text-slate-300 ">
                <h2 className="text-2xl">Info</h2>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <p>Level:</p>
                        <p>Hard</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Squares:</p>
                        <p>30x20</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Mines left:</p>
                        <p>{updatedMinesLeft}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Time:</p>
                        <Timer reset={reset} running={hasGameStarted} />
                    </div>
                    <div className="flex justify-between">
                        <p>Time to move:</p>
                        <Countdown reset={reset} running={hasGameStarted} update={onCellLeftClicked} />
                    </div>
                </div>
            </div>
        </>
    )
}
/*
<div className="flex flex-col items-end">
                        <p>Level:&nbsp;&nbsp;&nbsp;</p>
                        <p>Squares:&nbsp;&nbsp;&nbsp;</p>
                        <p>Mines left:&nbsp;&nbsp;&nbsp;</p>
                        <p>Time:&nbsp;&nbsp;&nbsp;</p>
                        <p>Time to move:&nbsp;&nbsp;&nbsp;</p>
                    </div>
                    <div>
                        <select onChange={handleChangeLevel} className="bg-inherit border">
                            <option value='easy' className="bg-inherit">Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                        <p>{gameConfigs[selectedLevel].squaresPerWidth}x{gameConfigs[selectedLevel].squaresPerHeight}</p>
                        <p>{updatedMinesLeft}</p>
                        <Timer reset={reset} running={hasGameStarted} />
                        <Countdown reset={reset} running={hasGameStarted} update={onCellLeftClicked} />
                    </div>*/