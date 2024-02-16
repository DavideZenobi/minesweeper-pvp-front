import { createContext, useContext, useEffect, useState } from "react";

const WindowSizeContext = createContext();

export const useWindowSizeContext = () => useContext(WindowSizeContext);

export const WindowSizeProvider = ({ children }) => {
    const breakpoints = {
        xs: 600,
        sm: 768,
        md: 992,
        lg: 1200,
    };

    const [currentSize, setCurrentSize] = useState();

    useEffect(() => {
        const getSizeCategory = () => {
            if (window.innerWidth <= breakpoints.xs) {
                return 'extra small';
            } else if (window.innerWidth <= breakpoints.sm) {
                return 'small';
            } else if (window.innerWidth <= breakpoints.md) {
                return 'medium';
            } else if (window.innerWidth <= breakpoints.lg) {
                return 'large';
            } else {
                return 'extra large';
            }
        };

        setCurrentSize(getSizeCategory());
    }, [window.innerWidth]);

    return (
        <WindowSizeContext.Provider value={{ currentSize }} >
            { children }
        </WindowSizeContext.Provider>
    )

}