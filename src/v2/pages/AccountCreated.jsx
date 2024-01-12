import { Box } from "@mui/material"
import { useEffect } from "react"


export const AccountCreated = () => {

    useEffect(() => {
        
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

    return (
        <>
            <Box sx={mainContainerStyle}>
                <Box sx={containerStyle}>
                    <h2>Account created</h2>
                    <p>A confirmation email has been sent.</p>
                </Box>
            </Box>
        </>
    )
}