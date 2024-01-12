import { Box } from "@mui/material";

export const Cell = ({ cell, onClick }) => {

    return (
        <>
            {cell.isOpen
                ? <div onContextMenu={(e) => e.preventDefault()}>
                    <Box sx={{ height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <Box sx={{ height: '24px', width: '24px', backgroundColor: 'lightgrey' }}>
                            {cell.isMine
                                ? <p style={{ color: 'red', margin: '0', textAlign: 'center', fontWeight: 'bold' }}>M</p>
                                : cell.neighborMines === 0
                                    ? null
                                    : <p style={{ margin: 0, textAlign: 'center', fontWeight: 'bold' }}>{cell.neighborMines}</p>
                            }
                        </Box>
                    </Box>
                </div>
                : <div onClick={() => onClick(cell.position)} onContextMenu={(e) => onClick(cell.position, e)}>
                    <Box sx={{ height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '24px', width: '24px', backgroundColor: 'grey' }}>
                            {cell.isFlagged
                                ? <p style={{ color: 'yellow', margin: '0', textAlign: 'center' }}>F</p>
                                : null
                            }
                        </Box>
                    </Box>
                </div>
            }
        </>
    );
}