import { Dialog, DialogTitle, Box, Button, Avatar, Backdrop } from "@mui/material";
import { useEffect, useState } from "react";
import { getSocket } from "../../utils/WebSocket";
import { useWebSocketContext } from "../../contexts/WebSocketContext";
import { useUserQueueContext } from "../../contexts/UserQueueContext";
import { CustomSnackbar } from '../CustomSnackbar.jsx';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


export const FoundMatchModal = () => {
    const { user } = useAuthContext();
    const { isWebSocketInit } = useWebSocketContext();
    const { remove, rejoin } = useUserQueueContext();
    
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const [users, setUsers] = useState([]); // {userId, username, status}

    const socket = getSocket();

    useEffect(() => {
        if (isWebSocketInit) {
            socket.on('match-founded', (users) => {
                console.log('Match founded!');
                setUsers(users);
                setOpen(true);
            });

            socket.on('update-user-action', ({userId, newStatus}) => {
                console.log('UserId: ' + userId + ' || New Status: ' + newStatus);
                updateUserStatus(userId, newStatus);
                if (newStatus === 'decline') {
                    rejoin();
                    handleClose();
                }
            });

            socket.on('all-users-accepted', ({roomId}) => {
                remove();
                setTimeout(() => {
                    setOpen(false);
                    handleClose();
                    navigate(`/game/${roomId}`);
                }, 1 * 1000);
            });
        }
    }, [isWebSocketInit]);

    // Only snackbar purposes
    useEffect(() => {
        let acceptedCounter = 0;

        for (const user of users) {
            if (user.status === 'decline') {
                updateSnackbar(true, 'warning', 'Match cancelled. Returning...');
                break;
            } else if (user.status === 'accept') {
                acceptedCounter++;
            }

            if (acceptedCounter === users.length) {
                updateSnackbar(true, 'success', 'Match accepted. Cleaning the room...');
            }
        }
    }, [users]);

    const containerStyle = {
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '10px',
        padding: '20px'
    }
    
    const usersContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: '20px',
        justifyContent: 'space-evenly'
    }
    
    const userContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
    }
    
    const buttonsContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: '0.5',
        columnGap: '20px',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    }

    const updateSnackbar = (open, severity, message) => {
        setSnackbarData({
            open: open,
            severity: severity,
            message: message
        });
    }

    const handleCloseSnackbar = () => {
        setSnackbarData({
            open: false,
            severity: 'success',
            message: '',
        });
    }

    const updateUserStatus = (userId, newStatus) => {
        setUsers(prevUsers => prevUsers.map(user => (
            user.userId === userId ? {...user, status: newStatus} : user
        )));
    }

    const sendMyStatus = (newStatus) => {
        socket.emit('match-action-selected', newStatus);
    }

    const handleMyStatus = (newStatus) => {
        sendMyStatus(newStatus);
        setAreButtonsDisabled(true);
        updateUserStatus(user.id, newStatus);

        if (newStatus === 'decline') {
            remove();
            handleClose();
        } else if (newStatus === 'accept') {

        }
    }

    const handleClose = () => {        
        setTimeout(() => {
            setAreButtonsDisabled(false);
            setUsers([]);
            setOpen(false);
        }, 1 * 1000);
    }

    return (
        <>
            <CustomSnackbar 
                open={snackbarData.open}
                severity={snackbarData.severity}
                message={snackbarData.message}
                onClose={handleCloseSnackbar}
            />
            <Dialog 
                onClose={() => handleMyStatus('decline')}
                open={open}
                
            >
                <Box sx={containerStyle}>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Match founded!</DialogTitle>
                    <Box sx={usersContainerStyle}>
                        {users && users.map((user) => (
                            <Box key={user.userId} sx={userContainerStyle}>
                                <Avatar alt={user.username}>
                                    <AccountCircleIcon />
                                </Avatar>
                                {user.userId}
                                {user.username}
                                {user.status === 'accept' && <CheckCircleOutlineIcon color="success" />}
                                {user.status === 'decline' && <CancelIcon color="error" />}
                                {user.status === 'pending' && <MoreHorizIcon />}
                            </Box>
                        ))}
                    </Box>
                    <Box sx={buttonsContainerStyle}>
                        <Button disabled={areButtonsDisabled} onClick={() => handleMyStatus('accept')} variant="contained" color="success">Accept</Button>
                        <Button disabled={areButtonsDisabled} onClick={() => handleMyStatus('decline')} variant="contained" color="error">Decline</Button>
                    </Box>
                    <p style={{fontStyle: 'italic', fontWeight: 'bold'}}>**REMEMBER: If you reload the page or change your route during the match, it will count as a defeat **</p>
                </Box>
            </Dialog>
        </>
    );
}