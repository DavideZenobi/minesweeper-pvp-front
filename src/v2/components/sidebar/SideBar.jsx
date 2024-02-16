//import '../styles/SideBar.css';
import { useAuthContext } from "../../contexts/AuthContext";
import PvpIcon from '../../static/pvp.png';
import SingleplayerIcon from '../../static/singleplayer.png';
import GameHistoryIcon from '../../static/gamehistory2.png';
import LogoutIcon from '../../static/logoutred.png';
import LoginIcon from '../../static/login.png';
import SettingsIcon from '../../static/settings.png';
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "./SideBarItem";
import { SnackbarCustom } from "../SnackbarCustom";
import { useState } from "react";
import { Snackbar } from "@mui/material";

export const SideBar = () => {
    const { isAuthenticated } = useAuthContext();
    const { user, logoutCx } = useAuthContext();

    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleLogout = async () => {
        const response = await logoutCx();

        if (response.ok) {
            setOpenSnackbar(true);
            navigate('/');
        }
    }

    const handleOnCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <>
            <div id="sidebar" className="flex flex-col justify-between gap-y-3 border-r border-black w-16 lg:w-44 h-full bg-gray-800">
                <div id="sidebar-top">
                    <div className="border-b border-gray-600">
                        <div className="flex flex-row justify-center items-center border-b border-gray-600 h-14 hover:bg-gray-700 hover:cursor-pointer">
                            <p onClick={() => navigate('/')} className="text-2xl text-slate-300 hidden lg:flex">Minesweeper</p>
                            <img src={LoginIcon} alt="pvp" className='w-6 h-6 mx-3 flex lg:hidden'></img>
                        </div>
                        <SideBarItem text='Singleplayer' icon={SingleplayerIcon} onClick={() => navigate('/game')} />
                        <SideBarItem text='Multiplayer' icon={PvpIcon} onClick={() => navigate('/game')} />
                        <SideBarItem text='History' icon={GameHistoryIcon} onClick={() => navigate('/history')} />
                    </div>
                    <div className="flex flex-col justify-start">
                        {!isAuthenticated &&
                            <>
                                <div className='flex flex-row justify-center items-center w-full gap-x-2 h-12'>
                                    <div onClick={() => navigate('/register')} className="hidden lg:flex justify-center items-center transition-colors duration-200 shadow-2xl rounded-md w-36 h-8 bg-blue-700 hover:bg-blue-600 hover:cursor-pointer">
                                        <p className="font-bold text-slate-300">Register</p>
                                    </div>
                                    <img src={LoginIcon} alt="pvp" className='w-6 h-6 mx-3 flex lg:hidden'></img>
                                </div>
                                <div className='flex flex-row justify-center items-center w-full gap-x-2 h-12'>
                                    <div onClick={() => navigate('/login')} className="hidden lg:flex justify-center items-center transition-colors duration-200 shadow-2xl rounded-md w-36 h-8 bg-green-700 hover:bg-green-600 hover:cursor-pointer">
                                        <p className="font-bold text-slate-300">Log In</p>
                                    </div>
                                    <img src={LoginIcon} alt="pvp" className='w-6 h-6 mx-3 flex lg:hidden'></img>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div id="sidebar-bottom" className="">
                    <SideBarItem text='Settings' icon={SettingsIcon} onClick={() => navigate('/profile')} />
                    {isAuthenticated
                        ?   <div onClick={handleLogout} className='flex flex-row justify-center items-center w-full gap-x-2 h-12 font-bold'>
                                <div className="flex justify-center items-center rounded-md w-36 h-8 bg-red-500 hover:bg-red-600 hover:cursor-pointer">
                                    <p className="font-bold text-slate-300">Log Out</p>
                                </div>
                            </div>
                        :   null
                    }
                </div>
            </div>
            <SnackbarCustom active={openSnackbar} text='Logged out succesfully!' onClose={handleOnCloseSnackbar} />
            
        </>
    )

    /*return (
        <Snackbar open={true} message='Test Hola hola ola' sx={{backgroundColor: 'green'}} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}></Snackbar>
        <>
            <Box className='sidebar-container'>
                <Box className='sidebar-item' onClick={() => navigate('/home')}>
                    <h3 className='sidebar-text-header'>Minesweeper PvP</h3>
                </Box>
                <hr style={{ width: '98%', margin: '0' }}></hr>
                {isAuthenticated
                    ?   <>
                            <Box className='sidebar-item'>
                                <p>Play Offline</p>
                            </Box>
                            <Box className='sidebar-item' onClick={() => navigate('/game')}>
                                <img src={PvpIcon} width='24' height='24' alt="PvP"/>
                                <p>Play Online</p>
                            </Box>
                        </>
                    :   null
                }
            </Box>
        </>
    )*/
}