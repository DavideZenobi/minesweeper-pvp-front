import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";


export const Chronometer = ({ active, onClick, time = 0 }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const intervalId = useRef();

    useEffect(() => {
        if (active) {
            intervalId.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds + 1 === 60) {
                        setMinutes(prevMinutes => prevMinutes + 1);
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                })
            }, 1000);

        } else {
            clearInterval(intervalId.current);
            intervalId.current = null;
            setSeconds(0);
            setMinutes(0);
        }

        return () => {
            clearInterval(intervalId.current);
        }
    }, [active])

    

    return (
        <>
            <Button onClick={onClick} size="small" variant="contained" color="info">
                In queue {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </Button>
        </>
    );
}