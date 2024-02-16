import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { getMatchesHistoryByUser } from "../api/privateApi";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export const History = () => {
    const { user } = useAuthContext();

    const navigate = useNavigate();

    const containerStyle = {
        width: '1000px',
        height: '550px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '20px',
        border: '2px solid black',
        borderRadius: '30px',
        backgroundColor: 'lightsteelblue',
    }

    const rowTableStyle = {
        borderBottom: '1px solid black'
    }

    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [matchesToDisplay, setMatchesToDisplay] = useState();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [matchesPerPage, setMatchesPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        const loadMatches = async () => {
            const response = await getMatchesHistoryByUser();
            if (response.ok) {
                const data = await response.json();
                setMatches(data);
                setTotalPages(Math.ceil(data.length / matchesPerPage));
                setMatchesToDisplay(data.slice(matchesPerPage * (currentPage - 1), matchesPerPage * currentPage));
            }
            setIsLoading(false);
        }

        loadMatches();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setMatchesToDisplay(matches.slice(matchesPerPage * (value - 1), matchesPerPage * value));
    }

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={containerStyle}>
                    <h3>Matches</h3>
                    <Table sx={{ width: 800, border: '2px solid black' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold', borderRight: '1px solid black', borderBottom: '1px solid black'}} align="center"><h3>Number</h3></TableCell>
                                <TableCell sx={{fontWeight: 'bold', borderRight: '1px solid black', borderBottom: '1px solid black'}} align="center"><h3>Opponent</h3></TableCell>
                                <TableCell sx={{fontWeight: 'bold', borderRight: '1px solid black', borderBottom: '1px solid black'}} align="center"><h3>Total games</h3></TableCell>
                                <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid black'}} align="center">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchesToDisplay.map((match, index) => (
                                <TableRow 
                                    key={match.id} 
                                    onClick={() => navigate(`/history/${match.id}`)} 
                                    sx={{ 
                                        backgroundColor: match.winner === user.username ? '#9ADE7B' : '#EB8181',
                                        '&:hover': {
                                            backgroundColor: match.winner === user.username ? '#82ba68' : '#d16969',
                                            cursor: 'pointer',
                                        }
                                    }}>
                                    <TableCell align="center">{(currentPage - 1) * matchesPerPage + index + 1}</TableCell>
                                    <TableCell align="center">{match.opponentUsername}</TableCell>
                                    <TableCell align="center">{match.totalGames}</TableCell>
                                    <TableCell align="center">{match.datetimeStarted}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination variant="outlined" color="primary" count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Box>
            </Box>    
        </>
    )
}