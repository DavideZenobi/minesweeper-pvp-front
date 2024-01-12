import { Box, TextField, InputAdornment, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { isPasswordValid, isUsernameValid } from "../../utils/regex";


export const Login = () => {
    const navigate = useNavigate();

    const { loginCx } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState();

    const isButtonDisabled = useMemo(() => {
        return !isUsernameValid(username) || !isPasswordValid(password);
    }, [username, password]);

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await loginCx(username, password);

        if (response.ok) {
            navigate('/home');
        }
    }


    const containerStyle = {
        width: '500px',
        height: '400px',
        border: '2px solid black',
        borderRadius: '30px',
        backgroundColor: 'lightsteelblue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '20px'
    }

    return (
        <>
            <Box sx={containerStyle}>
                <h2>Login</h2>
                <TextField 
                    inputProps={{maxLength: 16}} 
                    onChange={(e) => setUsername(e.target.value)} 
                    variant="outlined" 
                    label='Username' 
                    helperText='' 
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
                    helperText='' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment> 
                        )
                    }}
                />
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <Button onClick={handleSubmit} variant="contained" size="small" disabled={isButtonDisabled}>Login</Button>
            </Box>
        </>
    );
}