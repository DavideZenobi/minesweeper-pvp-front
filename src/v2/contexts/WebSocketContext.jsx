import { createContext, useContext, useEffect, useState } from "react";
import { disconnectSocket, initializeSocket } from '../websocket/websocket';
import { useAuthContext } from "./AuthContext";


const WebSocketContext = createContext();

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const { isAuthenticated, sessionId } = useAuthContext();
    const [isWebSocketInit, setIsWebSocketInit] = useState(false);
    const [socket, setSocket] = useState();

    useEffect(() => {
        if (isAuthenticated) {
            //initWebSocket();
        } else {
            disconnectWebSocket();
        }
    }, [isAuthenticated]);

    const initWebSocket = async () => {
        const socketConnection = await initializeSocket(sessionId);
        setSocket(socketConnection);
        setIsWebSocketInit(true);
        console.log('WebSocket initialized !!');
    }

    const disconnectWebSocket = () => {
        if (socket) {
            disconnectSocket();
            console.log('WebSocket disconnected!!')
            setIsWebSocketInit(false);
            setSocket(null);
        }
    }

    return (
        <WebSocketContext.Provider value={{ isWebSocketInit }}>
            { children }
        </WebSocketContext.Provider>
    );
}