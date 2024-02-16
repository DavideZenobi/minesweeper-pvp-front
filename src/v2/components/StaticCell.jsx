import { Box } from "@mui/material"


export const StaticCell = ({ cell, size }) => {

    return (
        <>
            {cell.isOpen
                ? 
                <Box onContextMenu={(e) => e.preventDefault()} sx={{ height: size + 1, width: size + 1, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <Box sx={{ height: size, width: size, backgroundColor: 'lightgrey', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {cell.isMine
                            ? <p style={{ color: 'red', margin: '0', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>M</p>
                            : cell.neighborMines === 0
                                ? null
                                : <p style={{ margin: 0, textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>{cell.neighborMines}</p>
                        }
                    </Box>
                </Box>
                : 
                <Box onContextMenu={(e) => e.preventDefault()} sx={{ height: size + 1, width: size + 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ height: size, width: size, backgroundColor: 'grey' }}>
                        {cell.isFlagged
                            ? <p style={{ color: 'yellow', margin: '0', textAlign: 'center', fontSize: '12px' }}>F</p>
                            : null
                        }
                    </Box>
                </Box>
            }
        </>
    )
}