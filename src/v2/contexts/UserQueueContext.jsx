import { createContext, useContext, useEffect, useState } from "react";
import { joinQueue, leaveQueue, rejoinQueue } from "../api/privateApi";
import { useEventSourceContext } from "./EventSourceContext";

const UserQueueContext = createContext();

export const useUserQueueContext = () => useContext(UserQueueContext);

export const UserQueueProvider = ({ children }) => {
    const { eventSource } = useEventSourceContext();

    const [isInQueue, setIsInQueue] = useState(false);

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

    useEffect(() => {
        if (eventSource) {
            eventSource.addEventListener('user-left-queue', handleLeftQueue);

            return () => {
                eventSource.removeEventListener('user-left-queue', handleLeftQueue);
            }
        }
    }, [eventSource]);

    // Event listener
    const handleLeftQueue = (event) => {
        setIsInQueue(false);
    }

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

    return (
        <UserQueueContext.Provider value={{ isInQueue, setIsInQueue, join, remove, rejoin }}>
            { children }
        </UserQueueContext.Provider>
    );
}