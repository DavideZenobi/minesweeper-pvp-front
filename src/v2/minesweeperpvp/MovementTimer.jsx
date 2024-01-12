import { useEffect, useState } from "react";

export const MovementTimer = ({ running, reset, updatedTimeToMove }) => {

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

    // Cuenta atrás
    useEffect(() => {
        let intervalId;

        if (running) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 1) {
                        clearInterval(intervalId);
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
    }, [running]);

    // Reset
    useEffect(() => {
        setSeconds(30);
    }, [reset]);

    useEffect(() => {
        if (updatedTimeToMove) {
            setSeconds(updatedTimeToMove);
        }
    }, [updatedTimeToMove]);

    return (
        <>
            <p style={{ color: textColor, fontWeight: 'bold' }}>Time to move: {seconds}</p>
        </>
    )
}