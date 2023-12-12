import { Box, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CustomSnackbar } from "../components/CustomSnackbar";
import { useMemo, useState } from "react";
import { getEmailAvailability, getUsernameAvailability, register } from "../api/publicApi";
import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/regex";
import { useNavigate } from "react-router-dom";


export const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailHelperText, setEmailHelperText] = useState();
    const [isEmailAvailable, setIsEmailAvailable] = useState(null);
    const [username, setUsername] = useState('');
    const [usernameHelperText, setUsernameHelperText] = useState();
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [arePasswordsMatching, setArePasswordsMatching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const isButtonDisabled = useMemo(() => {
        return !isEmailAvailable || !isUsernameAvailable || !arePasswordsMatching;
    }, [isEmailAvailable, isUsernameAvailable, arePasswordsMatching]);

    const handleEmailChange = async (e) => {
        const emailInput = e.target.value;
        if (isEmailValid(emailInput)) {
            const response = await getEmailAvailability(emailInput);
            const { isAvailable } = await response.json();
        
            if (isAvailable) {
                setEmailHelperText('Available');
                setIsEmailAvailable(true);
            } else {
                setEmailHelperText('Not available');
                setIsEmailAvailable(false);
            }
        } else {
            setEmailHelperText('');
            setIsEmailAvailable(null);
        }
        
        setEmail(emailInput);
    }

    const handleUsernameChange = async (e) => {
        const usernameInput = e.target.value;
        if (isUsernameValid(usernameInput)) {
            const response = await getUsernameAvailability(usernameInput);
            const { isAvailable } = await response.json();

            if (isAvailable) {
                setUsernameHelperText('Available');
                setIsUsernameAvailable(true);
            } else {
                setUsernameHelperText('Not available');
                setIsUsernameAvailable(false);
            }
        } else {
            setUsernameHelperText('');
            setIsUsernameAvailable(null);
        }

        setUsername(usernameInput);
    }

    const handlePasswordChange = async (e) => {
        const passwordInput = e.target.value;
        if (isPasswordValid(passwordInput)) {
            if (passwordInput === repeatPassword) {
                setArePasswordsMatching(true);
            } else {
                setArePasswordsMatching(false);
            }
        } else {
            setArePasswordsMatching(false);
        }
        
        setPassword(passwordInput);
    }

    const handleRepeatPasswordChange = async (e) => {
        const repeatPasswordInput = e.target.value;
        if (isPasswordValid(repeatPasswordInput)) {
            if (repeatPasswordInput === password) {
                setArePasswordsMatching(true);
            } else {
                setArePasswordsMatching(false);
            }
        } else {
            setArePasswordsMatching(false);
        }

        setRepeatPassword(repeatPasswordInput);
    }

    

    const handleCloseSnackbar = () => {
        setSnackbarData({
            open: false,
            severity: 'success',
            message: '',
        });
    }

    const handleRegister = async () => {
        const dataToSend = { email: email, username: username, password: password }
        const response = await register(dataToSend);

        if (response.status === 200) {
            navigate('/');
        }
    }

    const getEmailHelperText = () => {
        if (isEmailAvailable === null) {
            return <></>
        } else if (isEmailAvailable) {
            return <><CheckCircleOutlineIcon style={{ verticalAlign: 'middle' }} />&nbsp;{emailHelperText}</>
        } else {
            return <><ErrorOutlineIcon style={{ verticalAlign: 'middle' }} />&nbsp;{emailHelperText}</>
        }
    }

    const getUsernameHelperText = () => {
        if (isUsernameAvailable === null) {
            return <></>
        } else if (isUsernameAvailable) {
            return <><CheckCircleOutlineIcon style={{ verticalAlign: 'middle' }} />&nbsp;{usernameHelperText}</>
        } else {
            return <><ErrorOutlineIcon style={{ verticalAlign: 'middle' }} />&nbsp;{usernameHelperText}</>
        }
    }

    return (
        <>
            <Box
                width='550px'
                //height='50vh'
                margin='auto'
                paddingBottom='20px'
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
                <h2>Register</h2>
                <TextField
                    onChange={handleEmailChange}
                    //color={isEmailAvailable ? 'success' : 'error'}
                    variant="outlined" 
                    label='Email' 
                    helperText={getEmailHelperText()}
                    FormHelperTextProps={{
                        sx: {
                            color: isEmailAvailable ? 'green' : 'red'
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField 
                    inputProps={{maxLength: 16}} 
                    onChange={handleUsernameChange}
                    //color={isUsernameAvailable ? 'success' : 'error'}
                    variant="outlined" 
                    label='Username' 
                    helperText={getUsernameHelperText()}
                    FormHelperTextProps={{
                        sx: {
                            color: isUsernameAvailable ? 'green' : 'red'
                        }
                    }}
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
                    onChange={handlePasswordChange} 
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
                <TextField 
                    inputProps={{maxLength: 16}} 
                    onChange={handleRepeatPasswordChange} 
                    type="password" 
                    variant="outlined" 
                    label='Repeat password' 
                    helperText='Min length: 3 - Max: 16 / A-z and 0-9' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <KeyIcon />
                            </InputAdornment> 
                        )
                    }}
                />
                <p>Already have an account? <a href="/">Login</a></p>
                {isLoading ? 
                    <CircularProgress /> 
                    : 
                    <Button onClick={handleRegister} disabled={isButtonDisabled} variant="contained" size="small" >Register</Button>
                }
            </Box>
        </>
    );
}