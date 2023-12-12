import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { AppBar, Divider } from "@mui/material";
import { Logout } from "./Logout";
import { useUserQueueContext } from "../contexts/UserQueueContext";
import { Chronometer } from "./Chronometer";
import { FoundMatchModal } from "./common/FoundMatchModal";

export const CustomAppBar = () => {
    const { isAuthenticated, user } = useAuthContext();
    const { isInQueue, remove } = useUserQueueContext();

    const appBarStyle = {
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '50px',
        backgroundColor: 'grey'
    }

    const handleCloseChronometer = async () => {
        const response = await remove();
        if (response.ok) {
            
        }
    }

    return (
        <>
            <AppBar position="sticky" sx={appBarStyle}>              
                { isAuthenticated
                    ? <>
                        <FoundMatchModal />
                        <h2>Welcome {user.username}</h2>                  
                        <Link to='/home'>Home</Link>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Link to='/lobbies'>Lobbies</Link>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Link to='/play'>Play</Link>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        { isInQueue
                            ? <Chronometer active={isInQueue} onClick={handleCloseChronometer} time={0} />
                            : null
                        }
                        <Logout />
                    </> 
                    : null
                }               
            </AppBar>
        </>
    );
}