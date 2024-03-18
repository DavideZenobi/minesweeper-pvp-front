import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { validateUser } from "../api/privateApi";


export const MatchValidator = ({ children }) => {
    const navigate = useNavigate();
    const { matchId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validate = async () => {
            const response = await validateUser(matchId);
            if (response.ok) {
                setIsLoading(false);
            } else {
                navigate('/multiplayer');
            }
        }

        validate();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            {children}
        </>
    )
}