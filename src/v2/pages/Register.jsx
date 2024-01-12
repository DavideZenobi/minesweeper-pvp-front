import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyIcon from '@mui/icons-material/Key';
import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/regex";
import { getEmailAvailability, getUsernameAvailability, register } from "../api/publicApi";

export const Register = () => {
    const navigate = useNavigate();

    // Inputs
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [repeatPasswordInput, setRepeatPasswordInput] = useState('');
    const [arePasswordsMatching, setArePasswordsMatching] = useState(false);

    // After regex and availability
    const [isEmailOk, setIsEmailOk] = useState(null);
    const [isUsernameOk, setIsUsernameOk] = useState(null);
    const [isPasswordOk, setIsPasswordOk] = useState(null);
    const [isRepeatPasswordOk, setIsRepeatPasswordOk] = useState(null);

    const isButtonDisabled = useMemo(() => {
        return !isEmailOk || !isUsernameOk || !arePasswordsMatching;
    }, [isEmailOk, isUsernameOk, arePasswordsMatching]);

    const mainContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const containerStyle = {
        width: '400px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid black',
        backgroundColor: 'lightsteelblue',
        borderRadius: '30px',
        rowGap: '20px',
    }

    const handleEmailChange = async (e) => {
        setEmailInput(e.target.value);
        if (isEmailValid(e.target.value)) {
            const response = await getEmailAvailability(e.target.value);
            const { isAvailable } = await response.json();
            if (isAvailable) {
                setIsEmailOk(true);
            } else {
                setIsEmailOk(false);
            }
        } else {
            setIsEmailOk(null);
        }
    }

    const handleUsernameChange = async (e) => {
        setUsernameInput(e.target.value);
        if (isUsernameValid(e.target.value)) {
            const response = await getUsernameAvailability(e.target.value);
            const { isAvailable } = await response.json();
            if (isAvailable) {
                setIsUsernameOk(true);
            } else {
                setIsUsernameOk(false);
            }
        } else {
            setIsUsernameOk(null);
        }
    }

    const handlePasswordChange = async (e) => {
        setPasswordInput(e.target.value);
        if (isPasswordValid(e.target.value)) {
            if (e.target.value === repeatPasswordInput) {
                setArePasswordsMatching(true);
            } else {
                setArePasswordsMatching(false);
            }
        } else {
            setArePasswordsMatching(null);
        }
    }

    const handleRepeatPasswordChange = async (e) => {
        setRepeatPasswordInput(e.target.value);
        if (isPasswordValid(e.target.value)) {
            if (e.target.value === passwordInput) {
                setArePasswordsMatching(true);
            } else {
                setArePasswordsMatching(false);
            }
        } else {
            setArePasswordsMatching(null);
        }
    }

    const getEmailFeedback = () => {
        if (isEmailOk === null) {
            return <></>
        } else if (isEmailOk) {
            return <><CheckCircleOutlineIcon style={{ verticalAlign: 'middle' }} />&nbsp;</>
        } else {
            return <><ErrorOutlineIcon style={{ verticalAlign: 'middle' }} />&nbsp;</>
        }
    }

    const handleRegister = async () => {
        const dataToSend = { email: emailInput, username: usernameInput, password: passwordInput };
        const response = await register(dataToSend);
        if (response.ok) {
            navigate('/accountcreated');
        } else {
            
        }
    }

    return (
        <>
            <Box sx={mainContainerStyle}>
                <Box sx={containerStyle}>
                    <h2>Register</h2>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <TextField
                            onChange={handleEmailChange}
                            variant="standard"
                            label='Email'
                            helperText={getEmailFeedback()}
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )
                            }}
                            FormHelperTextProps={{
                                sx: {
                                    color: isEmailOk ? 'green' : 'red'
                                }
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            onChange={handleUsernameChange}
                            variant="standard"
                            label='Username'
                            helperText=''
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            onChange={handlePasswordChange}
                            variant="standard"
                            label='Password'
                            type="password"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            onChange={handleRepeatPasswordChange}
                            variant="standard"
                            label='Repeat password'
                            type="password"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Button disabled={isButtonDisabled} onClick={handleRegister} variant="contained" size="small">Register</Button>
                </Box>
            </Box>
        </>
    );
}