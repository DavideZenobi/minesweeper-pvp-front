import { useEffect, useState } from "react";
import { timeToMinutesAndSeconds } from "../utils/converter";

export const Timer = ({ running = false, reconnectionTime}) => {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let intervalId;

        if (running) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds + 1 === 60) {
                        setMinutes(prevMinutes => prevMinutes + 1);
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                })
            }, 1 * 1000);
        } 

        return () => {
            clearInterval(intervalId);
        }
    }, [running]);

    useEffect(() => {
        if (reconnectionTime) {
            const convertedTime = timeToMinutesAndSeconds(reconnectionTime);
            setMinutes(convertedTime[0]);
            setSeconds(convertedTime[1]);
        }
    }, [reconnectionTime])

    return (
        <>
            <p style={{fontWeight: 'bold'}}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        </>
    )
}