import { useEffect, useState } from "react";

export const Countdown = ({ running = false, startTime, onFinish, reconnectionTime }) => {

    const [seconds, setSeconds] = useState(startTime);

    // Cuenta atrás
    useEffect(() => {
        if (running) {
            const intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 1) {
                        clearInterval(intervalId);
                        return 0;
                    } else {
                        return prevSeconds - 1;
                    }
                });
                
            }, 1 * 1000);

            return () => {
                clearInterval(intervalId);
            }
        }
    }, [running]);

    useEffect(() => {
        if (reconnectionTime) {
            setSeconds(reconnectionTime);
        }
    }, [reconnectionTime])

    useEffect(() => {
        if (onFinish) {
            if (seconds === 0) {
                onFinish();
            }
        }
    }, [seconds])

    return (
        <>
            <p className="font-bold text-center">{seconds}</p>
        </>
    )
}