import { Box } from "@mui/material";

export const Cell = ({ cell, onClick }) => {

    /*
    return (
        <>
            {cell.isOpen 
                ?   <div>
                        <Box sx={{height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '24px', width: '24px', backgroundColor: 'lightgrey'}}>
                                {cell.isMine
                                    ?   <p style={{color: 'red', margin: '0', textAlign: 'center'}}>M</p>
                                    :   cell.neighborMines === 0
                                        ?   null
                                        :   <p style={{margin: 0, textAlign: 'center'}}>{cell.neighborMines}</p>
                                }
                            </Box>
                        </Box>
                    </div>
                :   <div onClick={() => onClick(cell.position)} onContextMenu={(e) => onClick(cell.position, e)}>
                        <Box sx={{height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '24px', width: '24px', backgroundColor: 'grey'}}>
                                {cell.isFlagged
                                    ?   <p style={{color: 'yellow', margin: '0', textAlign: 'center'}}>F</p>
                                    :   null
                                }
                            </Box>
                        </Box>
                    </div>
            }
        </>
    );*/

    return (
        <>
            {cell.isOpen
                ?   <div className="flex justify-center items-center w-[25px] h-[25px]">
                        <div className="w-[24px] h-[24px] bg-blue-300">
                            {cell.isMine
                                ?   <p className="text-red-500 m-0 text-center font-bold">M</p>
                                :   cell.neighborMines !== 0 &&
                                    <p className="text-center m-0">{cell.neighborMines}</p>
                            }
                        </div>
                    </div>   
                :   <div 
                        onClick={() => onClick(cell.position)} 
                        onContextMenu={(e) => onClick(cell.position, e)} 
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
    )
}