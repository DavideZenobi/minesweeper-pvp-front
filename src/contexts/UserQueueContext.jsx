import { createContext, useContext, useEffect, useState } from "react";
import { joinQueue, leaveQueue, rejoinQueue } from "../api/privateApi";
import { useAuthContext } from "./AuthContext";


const UserQueueContext = createContext();

export const useUserQueueContext = () => useContext(UserQueueContext);

export const UserQueueProvider = ({ children }) => {
    const { user } = useAuthContext();

    const [isInQueue, setIsInQueue] = useState(false);
    const [typeQueue, setTypeQueue] = useState();

    useEffect(() => {
        const handlePageRefresh = () => {  
            if (isInQueue) {
                remove();
            }
        }

        window.addEventListener('beforeunload', handlePageRefresh);
        return () => {
            window.removeEventListener('beforeunload', handlePageRefresh);
        }
    }, [isInQueue]);

    const join = async () => {
        const response = await joinQueue();
        if (response.ok) {
            setIsInQueue(true);
        }

        return response;
    }

    const remove = async () => {
        const response = await leaveQueue();
        if (response.ok) {
            setIsInQueue(false);
        }

        return response;
    }

    const rejoin = async () => {
        const response = await rejoinQueue();
        if (response.ok) {
            setIsInQueue(true);
        }

        return response;
    }

    const getUserQueueInfo = async () => {
        
    }

    return (
        <UserQueueContext.Provider value={{ isInQueue, typeQueue, join, remove, rejoin }}>
            { children }
        </UserQueueContext.Provider>
    );
}