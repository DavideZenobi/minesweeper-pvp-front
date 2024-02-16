import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Chronometer } from "../components/Chronometer";
import { useUserQueueContext } from "../contexts/UserQueueContext";

export const Home = () => {
    const navigate = useNavigate();

    const { isInQueue, join, remove } = useUserQueueContext();

    const style = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const containerStyle = {
        width: '500px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '20px',
        border: '2px solid black',
        borderRadius: '30px',
        backgroundColor: '#293847',
    }

    const handleJoinQueue = async () => {
        const response = await join();
        if (response.ok) {

        }
    }

    const handleLeaveQueue = async () => {
        const response = await remove();
        if (response.ok) {

        }
    }
    
    return (
        <>
            <Box sx={style}>
                <Box sx={containerStyle}>
                    <h3>Minesweeper PvP</h3>
                    <Button onClick={() => navigate('/game')} variant="contained" size="small">Play offline</Button>
                    { isInQueue
                        ?   <Button 
                                onClick={handleLeaveQueue} 
                                variant="contained" 
                                size="small" 
                                color="success"
                            >
                                <Chronometer />
                            </Button>
                        :   <Button 
                                onClick={handleJoinQueue} 
                                variant="contained" 
                                size="small" 
                                color="success"
                            >
                                Join queue
                            </Button>
                    }
                </Box>
            </Box>
        </>
    );
}