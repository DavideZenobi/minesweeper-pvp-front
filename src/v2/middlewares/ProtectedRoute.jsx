import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to='/login' replace={true} />
    }
}