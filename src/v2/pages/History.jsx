import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { getMatchesHistoryByUser } from "../api/privateApi";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export const History = () => {
    const { user } = useAuthContext();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [matchesToDisplay, setMatchesToDisplay] = useState();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [matchesPerPage, setMatchesPerPage] = useState(10);
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
            <div className="flex justify-center mt-36 w-full">
                {matchesToDisplay.length > 0
                    ?
                        <div className="w-200  flex flex-col items-center">
                            <h3 className="text-2xl text-slate-300">Matches</h3>
                            <table className="w-200">
                                <thead className="text-slate-300">
                                    <tr>
                                        <th>Number</th>
                                        <th>Opponent</th>
                                        <th>Total games</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matchesToDisplay.map((match, index) => (
                                        <tr key={match.id} onClick={() => navigate(`/history/${match.id}`)} className={`${match.winner === user.username ? 'bg-green-500' : 'bg-red-500'} ${match.winner === user.username ? 'hover:bg-green-400' : 'hover:bg-red-400'} text-center cursor-pointer`} >
                                            <td>{(currentPage - 1) * matchesPerPage + index + 1}</td>
                                            <td>{match.opponentUsername}</td>
                                            <td>{match.totalGames}</td>
                                            <td>{match.datetimeStarted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination variant="outlined" color="primary" count={totalPages} page={currentPage} onChange={handlePageChange} />
                        </div>
                    :
                        <div className="flex justify-center items-center">
                            <h2 className="text-3xl">No matches found</h2>
                        </div>
                }
            </div>
        </>
    )
}