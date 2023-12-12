import { useEffect, useState } from "react";
import { getRoomInfo } from "../api/privateApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";


export const RoomsValidator = ({ children }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { roomId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRoomInfo = async () => {
            const response = await getRoomInfo(roomId);
            const data = await response.json();
            data.players.forEach(player => {
                if (player.username === user.username) {
                    if (player.status === 'exited') {
                        navigate('/home');
                    }
                }
            });
            
            setIsLoading(false);
        }

        loadRoomInfo();
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }


    return (
        <>
            {children}
        </>
    );
}