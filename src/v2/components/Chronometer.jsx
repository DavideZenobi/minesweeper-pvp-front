import { useEffect, useState } from "react"


export const Chronometer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
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
    }, []);

    return (
        <>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </>
    );
}