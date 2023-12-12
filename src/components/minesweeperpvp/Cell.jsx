import { Box } from "@mui/material";

export const Cell = ({ onClick, onRightClick, coordinates, cell }) => {

    return (
        <>
            {cell.isOpen 
                ?   <div>
                        <Box sx={{height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '24px', width: '24px', backgroundColor: 'lightgrey'}}>
                                {cell.isMine
                                    ? <p style={{color: 'red', margin: '0', textAlign: 'center'}}>M</p>
                                    : cell.neighborMines === 0
                                        ? null
                                        : <p style={{margin: 0, textAlign: 'center'}}>{cell.neighborMines}</p>
                                }
                            </Box>
                        </Box>
                    </div>
                :   <div onClick={() => onClick(coordinates)} onContextMenu={(e) => onRightClick(e, coordinates)}>
                        <Box sx={{height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{height: '24px', width: '24px', backgroundColor: 'grey'}}>
                                {cell.isFlagged
                                    ? <p style={{color: 'yellow', margin: '0', textAlign: 'center'}}>F</p>
                                    : null
                                }
                            </Box>
                        </Box>
                    </div>
            }
        </>
    );
}