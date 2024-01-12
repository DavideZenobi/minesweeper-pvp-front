import { createContext, useContext, useEffect, useState } from "react";
import { authenticate, login } from "../api/publicApi";
import { logout } from "../api/privateApi";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(); //
    const [sessionId, setSessionId] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuthenticate = async () => {
            await authCx();
            setIsLoading(false);
        }
        
        initAuthenticate();
    }, []);

    const loginCx = async (username, password) => {
        const response = await login(username, password);

        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setSessionId(data.sessionId);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        return response;
    }

    const logoutCx = async () => {
        const response = await logout();
        setUser('');
        setIsAuthenticated(false);

        return response;
    }

    const authCx = async () => {
        const response = await authenticate();
        const data = await response.json();

        if (data.isValid) {
            setIsAuthenticated(true);
            setUser(data.user);
            setSessionId(data.sessionId);
        } else {
            setIsAuthenticated(false);
            console.log(data.message);
        }
    }

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, sessionId, loginCx, logoutCx, authCx }}>
            { children }
        </AuthContext.Provider>
    )
}