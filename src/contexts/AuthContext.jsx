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
            await contextAuthenticate();
            setIsLoading(false);
        }
        
        initAuthenticate();
    }, [])

    const contextLogin = async (username, password) => {
        const response = await login(username, password);

        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setSessionId(data.sessionId);
            setTimeout(() => {
                setIsAuthenticated(true);
            }, 2 * 1000);
        } else {
            setIsAuthenticated(false);
        }

        return response;
    }

    const contextLogout = async () => {
        const response = await logout();
        setTimeout(() => {
            setUser('');
            setIsAuthenticated(false);
        }, 2 * 1000);
        return response;
    }

    const contextAuthenticate = async () => {
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
        <AuthContext.Provider value={{ isAuthenticated, user, sessionId, contextLogin, contextLogout, contextAuthenticate }}>
            { children }
        </AuthContext.Provider>
    )
}