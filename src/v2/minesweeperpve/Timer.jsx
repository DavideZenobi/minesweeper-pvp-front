import { useEffect, useState } from "react";

export const Timer = ({ running = false, reset }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (running) {
            const intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds + 1 === 60) {
                        setMinutes(prevMinutes => prevMinutes + 1);
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                })
            }, 1 * 1000);

            return () => {
                clearInterval(intervalId);
            }
        } 
    }, [running]);

    useEffect(() => {
        setMinutes(0);
        setSeconds(0);
    }, [reset]);

    return (
        <>
            <p className="font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        </>
    );
}