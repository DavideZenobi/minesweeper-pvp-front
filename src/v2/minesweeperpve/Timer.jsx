import { useEffect, useState } from "react";

export const Timer = ({ running = false, onReset }) => {
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
            setSeconds(0);
            setMinutes(0);
        }

    }, [running]);

    return (
        <>
            <p style={{fontWeight: 'bold'}}>Time {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        </>
    );
}