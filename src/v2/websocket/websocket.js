import { io } from "socket.io-client";

let socket;

export const initializeSocket = (userSessionId) => {
    return new Promise((resolve, reject) => {
        if (userSessionId) {
            socket = io('localhost:3000', {
                auth: {
                    token: userSessionId
                },
                withCredentials: true,
            })
        }

        socket.on('connect', () => {
            resolve(socket);
        });

        socket.on('connect_error', (error) => {
            reject(error); 
        });
    })
}

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket && socket.connected) {
        socket.disconnect();
        console.log('User disconnected from WebSocket');
    }
};
