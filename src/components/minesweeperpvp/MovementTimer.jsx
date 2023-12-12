import { useEffect, useState } from "react";
import { useMatchContext } from "../../contexts/MatchContext";


export const MovementTimer = ({ reset, onReset, onZero }) => {
    const { matchStatus } = useMatchContext();

    const [seconds, setSeconds] = useState(30);
    const [textColor, setTextColor] = useState();

    // Sirve para cambiar el estilo
    useEffect(() => {
        if (seconds > 5 && seconds <= 10) {
            setTextColor('orange');
        } else if (seconds <= 5) {
            setTextColor('red');
        } else {
            setTextColor('black');
        }
    }, [seconds]);

    useEffect(() => {
        let intervalId;

        if (matchStatus === 'running') {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 1) {
                        clearInterval(intervalId);
                        onZero();
                        return 0;
                    } else {
                        return prevSeconds - 1;
                    }
                });
                
            }, 1 * 1000);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [matchStatus]);

    useEffect(() => {
        if (reset) {
            setSeconds(30);
            onReset();
        }
    }, [reset])

    return (
        <>
            <p style={{ color: textColor }}>Time left to move: {seconds}</p>
        </>
    );
}