import { useEffect, useState } from "react";
import { useMatchContext } from "../../contexts/MatchContext";


export const Timer = ({ setTime }) => {
    const { matchStatus } = useMatchContext();

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let intervalId;

        if (matchStatus === 'running') {
            let counter = 0;
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds + 1 === 60) {
                        setMinutes(prevMinutes => prevMinutes + 1);
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                })

                counter++;
                setTime(counter);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        if (matchStatus === 'countdown') {
            setMinutes(0);
            setSeconds(0);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [matchStatus]);

    return (
        <>
            Time {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </>
    );
}