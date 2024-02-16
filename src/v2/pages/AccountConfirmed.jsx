import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../api/publicApi";


export const AccountConfirmed = () => {
    const navigate = useNavigate();

    const { uuid } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [created, setCreated] = useState();

    useEffect(() => {
        const verify = async () => {
            const response = await verifyUser(uuid);
            if (response.status === 404) {
                navigate('/login');
            } else if (response.status === 401) {
                setCreated(false);
            } else if (response.status === 200) {
                setCreated(true);
            }
            setIsLoading(false);
        }

        verify();
    }, []);

    const mainContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const containerStyle = {
        width: '400px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid black',
        backgroundColor: 'lightsteelblue',
        borderRadius: '30px',
        rowGap: '20px',
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <Box sx={mainContainerStyle}>
                <Box sx={containerStyle}>
                    {created
                        ?   <>
                                <h2>Account confirmed</h2>
                                <p>Redirecting to login...</p>
                            </>
                        :   <>
                                <h2>Token expired</h2>
                                <p>Another email has been sent</p>
                            </>
                    }
                    
                </Box>
            </Box>
        </>
    )
}