import { Box, Dialog, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const ScoreModal = ({ isOpen, onClose, stats, gameResult, gameNumber }) => {

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={onClose}
                PaperProps={{ sx: { maxWidth: 'none' } }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <DialogTitle>You {gameResult} game {gameNumber}</DialogTitle>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        {stats && stats.map((playerResults, index) => (
                            <Box key={playerResults.username} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h2>{playerResults.username}</h2>
                                <TableContainer sx={{ borderRight: index === 0 ? '1px solid black' : '0px', borderTop: '1px solid black'}}>
                                    <Table >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Game number</TableCell>
                                                <TableCell>Opened cells</TableCell>
                                                <TableCell>Mines Flagged</TableCell>
                                                <TableCell>Time</TableCell>
                                                <TableCell>Score</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {playerResults.results.map(stat => (
                                                <TableRow key={stat.gameNumber}>
                                                    <TableCell>{stat.gameNumber}</TableCell>
                                                    <TableCell>{stat.openedCells}</TableCell>
                                                    <TableCell>{stat.correctFlaggedCells}</TableCell>
                                                    <TableCell>{stat.time}</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>{stat.score}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Dialog>    
        </>
    );
}