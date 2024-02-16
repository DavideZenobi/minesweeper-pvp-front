import { useEffect, useState } from "react";


export const Countdown = ({ running = false, reset }) => {
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        if (running) {
            const intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds - 1 === 0) {
                        clearInterval(intervalId);
                        return 0;

                    } else {
                        return prevSeconds - 1;
                    }
                })
            }, 1 * 1000);

            return () => {
                clearInterval(intervalId);
            }
        }
    }, [running]);

    useEffect(() => {
        setSeconds(30);
    }, [reset]);

    return (
        <>
            <p className="font-bold">{String(seconds).padStart(2, '0')}</p>
        </>
    )
}