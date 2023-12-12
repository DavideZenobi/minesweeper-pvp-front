import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { CustomSnackbar } from "./CustomSnackbar";

export const Logout = () => {
    const navigate = useNavigate();
    const { contextLogout } = useAuthContext();

    const [snackbarData, setSnackbarData] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const handleLogout = async () => {
        const response = await contextLogout();
        if (response.ok) {
            setSnackbarData({
                open: true,
                severity: 'success',
                message: 'You have logged out! Redirecting...',
            });
            setTimeout(() => {
                navigate('/');
            }, 2 * 1000);
        } else {
            console.log('Some error occurred');
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbarData({
            open: false,
            severity: 'success',
            message: '',
        });
    }

    return (
        <>
            <CustomSnackbar 
                open={snackbarData.open}
                severity={snackbarData.severity}
                message={snackbarData.message}
                onClose={handleCloseSnackbar}
            />
            <Button size="small" variant="contained" color="error" onClick={handleLogout}>Log out</Button>
        </>
    );
}