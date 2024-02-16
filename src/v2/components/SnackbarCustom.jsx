import { useEffect, useState } from "react"
import OkIcon from '../static/ok.png';
import ErrorIcon from '../static/error.png';

export const SnackbarCustom = ({ active = false, text, status = 'ok', autohideTime = 2, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const statusVariants = {
        ok: {
            backgroundColor: 'bg-green-200',
            icon: OkIcon
        },
        error: {
            backgroundColor: 'bg-red-200',
            icon: ErrorIcon
        },
        info: {
            backgroundColor: 'bg-blue-200',
            icon: OkIcon
        }
    }

    useEffect(() => {
        if (active) {
            setIsOpen(true);
            const timeoutId = setTimeout(() => {
                setIsOpen(false);
                onClose();
            }, autohideTime * 1000);

            return () => {
                clearTimeout(timeoutId);
            }
        }
        
    }, [active]);

    return (
        <>
            <div className={`${isOpen ? 'visible' : 'hidden'} ${statusVariants[status].backgroundColor} top-6 left-1/2 right-auto rounded-md flex flex-row justify-evenly items-center w-64 h-10 fixed `}>
                <img src={statusVariants[status].icon} className="w-6 h-6" alt="icon"/>
                <p>{text}</p>
            </div>
        </>
    )
}