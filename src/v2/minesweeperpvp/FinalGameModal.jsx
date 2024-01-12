import { Box, Dialog, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"


export const FinalGameModal = ({ isOpen, setIsOpen, usersResults }) => {

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                PaperProps={{ sx: { maxWidth: 'none' } }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <DialogTitle>Results</DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {usersResults && usersResults.map((userResults, index) => (
                            <Box 
                                key={userResults.username} 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    borderTop: '2px solid black',
                                    borderLeft: index !== 0 || index !== usersResults.length - 2 
                                        ? '2px solid black' 
                                        : null
                                }}>
                                <h2>{userResults.username} {userResults.wins}</h2>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{fontWeight: 'bold'}}>Game number</TableCell>
                                                <TableCell sx={{fontWeight: 'bold'}}>Score (points)</TableCell>
                                                <TableCell sx={{fontWeight: 'bold'}}>Time (seconds)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userResults.results.map(result => (
                                                <TableRow key={result.gameNumber} sx={{backgroundColor: result.winner ? 'green' : 'red'}}>
                                                    <TableCell>{result.gameNumber}</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>{result.score}</TableCell>
                                                    <TableCell>{result.time}</TableCell>
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
    )
}