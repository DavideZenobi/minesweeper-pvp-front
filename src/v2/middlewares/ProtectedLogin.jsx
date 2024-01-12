import { Navigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext";

export const ProtectedLogin = ({ children }) => {
    const { isAuthenticated } = useAuthContext();


    if (isAuthenticated) {
        return <Navigate to='/home' />
    } else {
        return children;
    }
}