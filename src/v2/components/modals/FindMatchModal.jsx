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

export const FindMatchModal = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const { eventSource } = useEventSourceContext();

    const matchIdRef = useRef(null);
    
    const usersRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
    const [countdownRunning, setCountdownRunning] = useState(false);

    useEffect(() => {
        if (eventSource) {
            eventSource.addEventListener('match-found', handleMatchFound);
            eventSource.addEventListener('match-accepted', handleMatchAccepted);
            eventSource.addEventListener('match-cancelled-by-countdown', handleMatchCancelledByCountdown);
            eventSource.addEventListener('match-cancelled-by-decline', handleMatchCancelledByDecline);
            eventSource.addEventListener('user-update', handleUserUpdate);
        }

        return () => {
            if (eventSource) {
                eventSource.removeEventListener('match-found', handleMatchFound);
                eventSource.removeEventListener('match-accepted', handleMatchAccepted);
                eventSource.removeEventListener('match-cancelled-by-countdown', handleMatchCancelledByCountdown);
                eventSource.removeEventListener('match-cancelled-by-decline', handleMatchCancelledByDecline);
                eventSource.removeEventListener('user-update', handleUserUpdate);
            }
        }
    }, [eventSource]);

    useEffect(() => {
        usersRef.current = users;
    }, [users]);

    // Event listener
    const handleMatchFound = (event) => {
        const data = JSON.parse(event.data);
        setUsers(data.players);
        matchIdRef.current = data.matchId;
        openModal();
        setCountdownRunning(true);
    }

    // Event listener
    const handleMatchAccepted = (event) => {
        const usernames = [];
        usersRef.current.map(user => (
            usernames.push(user.username)
        ));
        closeModal();
        handleCloseModal();
        navigate(`/game/${matchIdRef.current}`, {state: usernames});
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
    const handleMatchCancelledByDecline = () => {
        setUsers(prevUsers => prevUsers.map(user => (
            user.status === 'declined' ? {...user, status: 'declined'} : user
        )));
        setAreButtonsDisabled(true);
        handleCloseModal();
    }

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
        setCountdownRunning(false);
        setTimeout(() => {
            closeModal();
            setAreButtonsDisabled(false);
            matchIdRef.current = null;
        }, 1 * 1000);
    }

    const openModal = () => {
        const dialog = document.getElementById('found-match-modal');
        dialog.showModal();
    }

    const closeModal = () => {
        const dialog = document.getElementById('found-match-modal');
        dialog.close();
    }

    return (
        <>
            <dialog id="found-match-modal" className="backdrop:backdrop-blur-sm p-10 bg-gray-800 rounded-md text-slate-300">
                <h2 className="text-3xl">Match founded!</h2>
                <div className="flex justify-evenly">
                    {users && users.map((currentUser, index) => (
                        <div key={currentUser.username} className="flex flex-col items-center">
                            <Avatar alt={currentUser.username}>
                                <AccountCircleIcon />
                            </Avatar>
                            {currentUser.username}
                            {currentUser.status === 'accepted' && <CheckCircleOutlineIcon color="success" />}
                            {currentUser.status === 'declined' && <CancelIcon color="error" />}
                            {currentUser.status === 'pending' && <MoreHorizIcon />}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-x-5 mt-4">
                    <button onClick={handleAcceptMatch} disabled={areButtonsDisabled} className="bg-green-600 enabled:hover:bg-green-500 disabled:opacity-25 px-2 rounded-sm enabled:cursor-pointer">Accept</button>
                    <button onClick={handleDeclineMatch} disabled={areButtonsDisabled} className="bg-red-600 enabled:hover:bg-red-500 disabled:opacity-25 px-2 rounded-sm enabled:cursor-pointer">Decline</button>
                </div>
                <Countdown key={countdownRunning} running={countdownRunning} startTime={20}/>
            </dialog>
        </>
    );
}