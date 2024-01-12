import { Avatar, Box, Button, Dialog, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuthContext } from "../../contexts/AuthContext";
import { acceptMatch, declineMatch, leaveQueue } from "../../api/privateApi";
import { useEventSourceContext } from "../../contexts/EventSourceContext";
import { useUserQueueContext } from "../../contexts/UserQueueContext";
import { useNavigate } from "react-router-dom";
import { Countdown } from "../../minesweeperpvp/Countdown";

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
    columnGap: '60px',
    justifyContent: 'space-evenly'
}

const userContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const buttonsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '0.5',
    columnGap: '20px',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
}

export const FindMatchModal = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const { eventSource } = useEventSourceContext();

    const matchIdRef = useRef(null);
    
    const [users, setUsers] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

    useEffect(() => {
        if (eventSource) {
            eventSource.addEventListener('match-found', handleMatchFound);
            eventSource.addEventListener('match-accepted', handleMatchAccepted);
            eventSource.addEventListener('match-cancelled-by-countdown', handleMatchCancelledByCountdown);
            //eventSource.addEventListener('match-cancelled-by-decline', handleMatchCancelledByDecline);
            eventSource.addEventListener('user-update', handleUserUpdate);
        }

        return () => {
            if (eventSource) {
                eventSource.removeEventListener('match-found', handleMatchFound);
                eventSource.removeEventListener('match-accepted', handleMatchAccepted);
                eventSource.removeEventListener('match-cancelled-by-countdown', handleMatchCancelledByCountdown);
                //eventSource.removeEventListener('match-cancelled-by-decline', handleMatchCancelledByDecline);
                eventSource.removeEventListener('user-update', handleUserUpdate);
            }
        }
    }, [eventSource]);

    // Event listener
    const handleMatchFound = (event) => {
        const data = JSON.parse(event.data);
        setUsers(data.players);
        matchIdRef.current = data.matchId;
        setIsOpen(true);
    }

    // Event listener
    const handleMatchAccepted = (event) => {
        setIsOpen(false);
        handleCloseModal();
        navigate(`/game/${matchIdRef.current}`);
    }

    // Event listener
    const handleMatchCancelledByCountdown = (event) => {
        setUsers(prevUsers => prevUsers.map(user => (
            user.status === 'accepted' ? user : {...user, status: 'declined'}
        )));
        setAreButtonsDisabled(true);
        handleCloseModal();
    }

    // Event listener
    /*const handleMatchCancelledByDecline = () => {
        setUsers(prevUsers => prevUsers.map(user => (
            user.status === 'declined' ? {...user, status: 'declined'} : user
        )));
        setAreButtonsDisabled(true);
        handleCloseModal();
    }*/

    // Event listener
    const handleUserUpdate = (event) => {
        const data = JSON.parse(event.data);
        updateUserStatus(data.username, data.status);

        if (data.status === 'declined') {
            setAreButtonsDisabled(true);
            handleCloseModal();
        }
    }

/*****************************************************************************************/
    
    const updateUserStatus = (username, newStatus) => {
        setUsers(prevUsers => prevUsers.map(prevUser => (
            prevUser.username === username ? {...prevUser, status: newStatus} : prevUser
        )));
    }

    // Button onClick
    const handleAcceptMatch = async () => {
        setAreButtonsDisabled(true);
        const response = await acceptMatch(matchIdRef.current);
        if (response.ok) {
            updateUserStatus(user.username, 'accepted');
        }
    }

    // Button onClick
    const handleDeclineMatch = async () => {
        setAreButtonsDisabled(true);
        const response = await declineMatch(matchIdRef.current);
        if (response.ok) {
            updateUserStatus(user.username, 'declined');
            handleCloseModal();
        } 
    }

    const handleCloseModal = () => {
        
        setTimeout(() => {
            setIsOpen(false);
            setAreButtonsDisabled(false);
            matchIdRef.current = null;
        }, 1 * 1000);
    }

    return (
        <>
            <Dialog
                open={isOpen}
            >
                <Box sx={containerStyle}>
                    <DialogTitle sx={{ fontWeight: 'bold '}}>Match founded !</DialogTitle>
                    <Box sx={usersContainerStyle}>
                        {users && users.map((currentUser, index) => (
                            <Box key={index} sx={userContainerStyle}>
                                <Avatar alt={currentUser.username}>
                                    <AccountCircleIcon />
                                </Avatar>
                                {currentUser.username}
                                {currentUser.status === 'accepted' && <CheckCircleOutlineIcon color="success" />}
                                {currentUser.status === 'declined' && <CancelIcon color="error" />}
                                {currentUser.status === 'pending' && <MoreHorizIcon />}
                            </Box>
                        ))}
                    </Box>
                    <Box sx={buttonsContainerStyle}>
                        <Button onClick={handleAcceptMatch} disabled={areButtonsDisabled} variant="contained" color="success">Accept</Button>
                        <Button onClick={handleDeclineMatch} disabled={areButtonsDisabled} variant="contained" color="error">Decline</Button>
                    </Box>
                    <Countdown running={true} startTime={20}/>
                    <p style={{fontStyle: 'italic', fontWeight: 'bold'}}>**REMEMBER: If you reload the page or change your route during the match, it will count as a defeat **</p>
                </Box>
                
            </Dialog>  
        </>
    );
}