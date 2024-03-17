import { Box } from "@mui/material";

export const OpponentCell = ({ cell }) => {

    return (
        <>
            {cell.isOpen
                ?   <div onContextMenu={(e) => e.preventDefault()} className="flex justify-center items-center w-[25px] h-[25px]">
                        <div className="w-[24px] h-[24px] bg-blue-300">
                            {cell.isMine
                                ?   <p className="text-red-500 m-0 text-center font-bold">M</p>
                                :   cell.neighborMines !== 0 &&
                                    <p className="text-center m-0">{cell.neighborMines}</p>
                            }
                        </div>
                    </div>   
                :   <div
                        id={cell.position.rowIndex + '-' + cell.position.colIndex}
                        onContextMenu={(e) => e.preventDefault()} 
                        className="flex justify-center items-center w-[25px] h-[25px]"
                    >
                        <div className="w-[24px] h-[24px] bg-gradient-to-b from-cyan-400 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
                            {cell.isFlagged &&
                                <p className="text-orange-200 m-0 text-center font-bold">F</p>
                            }
                        </div>
                    </div>
            }
        </>
    );
}