import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to='/' />
    }
}