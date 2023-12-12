import { Button } from "@mui/material";
import { useUserQueueContext } from "../contexts/UserQueueContext.jsx";


export const JoinQuickMatchButton = () => {
    const { isInQueue, join, remove } = useUserQueueContext();

    const handleJoinQueue = async () => {
        const response = await join();
    }

    const handleLeaveQueue = async () => {
        const response = await remove();
    }

    return (
        <>
            { isInQueue
                ? <Button onClick={handleLeaveQueue} size="small" variant="contained" color="error">Cancel queue</Button>
                : <Button onClick={handleJoinQueue} size="small" variant="contained" color="success">Quick Match</Button>
            }
        </>
    );
}