import { useEffect, useState } from "react";


export const Countdown = ({ open, handleFinish, time = 5 }) => {
    const [seconds, setSeconds] = useState(time);

    useEffect(() => {
        let intervalId;
        if (open) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        clearInterval(intervalId);
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }, 1 * 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [open]);

    useEffect(() => {
        if (open && seconds === 0) {
            handleFinish();
            setSeconds(time);
        }
    }, [seconds]);

    return (
        <>
            {open 
                ?   <p>&nbsp;{seconds}</p>
                :   null
            }
        </>
    );
}