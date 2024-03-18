import { Box, TextField, InputAdornment, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { isPasswordValid, isUsernameValid } from "../../utils/regex";
import { SnackbarCustom } from "../components/SnackbarCustom";
import { useSnackbarContext } from "../contexts/SnackbarContext";


export const Login = () => {
    const navigate = useNavigate();

    const { loginCx } = useAuthContext();
    const { showSuccessLogin, showFailLogin } = useSnackbarContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isButtonDisabled = useMemo(() => {
        return !isUsernameValid(username) || !isPasswordValid(password);
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginCx(username, password);

        if (response.ok) {
            showSuccessLogin();
            navigate('/multiplayer');
        } else {
            showFailLogin();
            setUsername('');
            setPassword('');
        }
    }

    return (
        <>
            <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col w-96 h-96 border border-black rounded-md items-center bg-gray-800'>
                    <h1 className="text-slate-300 text-2xl p-2">Login</h1>
                    <div className="flex h-full justify-start items-start">
                        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-5">
                            <TextField 
                                inputProps={{maxLength: 16}}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                variant="standard" 
                                label='Username' 
                                helperText=''
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment> 
                                    ),
                                    sx: {color: '#cbd5e1'},
                                }}
                                InputLabelProps={{
                                    style: { color: '#cbd5e1'},
                                }}
                            />
                            <TextField 
                                inputProps={{maxLength: 16}}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password" 
                                variant="standard" 
                                label='Password' 
                                helperText='' 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment> 
                                    ),
                                    sx: {color: '#cbd5e1'},
                                }}
                                InputLabelProps={{
                                    style: { color: '#cbd5e1'},
                                }}
                            />
                            <input 
                                type="submit"
                                disabled={isButtonDisabled}
                                value='Login' 
                                onClick={handleSubmit}
                                className="bg-green-500 rounded-md w-24 h-8 hover:bg-green-600 hover:cursor-pointer disabled:bg-gray-600"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}