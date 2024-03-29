import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";


const EventSourceContext = createContext();

export const useEventSourceContext = () => useContext(EventSourceContext);

export const EventSourceProvider = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    const [eventSource, setEventSource] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const eventSource = new EventSource(`${process.env.REACT_APP_PRIVATE_API_URL}/sse`, {
                withCredentials: true,
            });
            setEventSource(eventSource);
        } else {
            if (eventSource) {
                eventSource.close();
                setEventSource(null);
            }
        }
    }, [isAuthenticated]);

    const closeEventSource = () => {
        eventSource.close();
    }

    return (
        <EventSourceContext.Provider value={{ eventSource, closeEventSource }}>
            { children }
        </EventSourceContext.Provider>
    )
}