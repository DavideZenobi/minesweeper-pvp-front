import { Box, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useState, useMemo } from "react";
import { isPasswordValid, isUsernameValid } from "../utils/regex";
import { useNavigate } from "react-router-dom";
import { CustomSnackbar } from "../components/CustomSnackbar";
import { useAuthContext } from "../contexts/AuthContext";

export const Login = () => {
    const navigate = useNavigate();
    const { contextLogin } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const isButtonDisabled = useMemo(() => {
        return !isUsernameValid(username) || !isPasswordValid(password);
    }, [username, password]);

    const handleLogin = async () => {
        setIsLoading(true);
        const response = await contextLogin(username, password);

        if (response.ok) {
            setSnackbarData({
                open: true,
                severity: 'success',
                message: 'You have logged in! Redirecting...',
            });
            setTimeout(() => {
                setIsLoading(false);
                navigate('/home');
            }, 2 * 1000);

        } else {
            setSnackbarData({
                open: true,
                severity: 'error',
                message: 'Login failed. Please try again.',
            });
            setIsLoading(false);
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
            <Box
                width='550px'
                height='50vh'
                margin='auto'
                display='flex'
                flexDirection='column'
                alignItems='center'
                border='1px solid black'
                borderRadius='4px'
                rowGap='20px'
            >
                <CustomSnackbar
                    open={snackbarData.open}
                    severity={snackbarData.severity}
                    message={snackbarData.message}
                    onClose={handleCloseSnackbar}
                />
                <h2>Login</h2>
                <TextField 
                    inputProps={{maxLength: 16}} 
                    onChange={(e) => setUsername(e.target.value)} 
                    variant="outlined" 
                    label='Username' 
                    helperText='Min length: 3 - Max: 16 / A-z and 0-9' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon />
                            </InputAdornment> 
                        )
                    }}
                />
                <TextField 
                    inputProps={{maxLength: 16}} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    variant="outlined" 
                    label='Password' 
                    helperText='Min length: 3 - Max: 16 / A-z and 0-9' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment> 
                        )
                    }}
                />
                <p>Don't have an account? <a href="/register">Register</a></p>
                {isLoading ? 
                    <CircularProgress /> 
                    : 
                    <Button onClick={handleLogin} variant="contained" size="small" disabled={isButtonDisabled}>Login</Button>
                }
            </Box>
        </>
    );
}