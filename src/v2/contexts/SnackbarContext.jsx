import { createContext, useContext, useState } from "react";
import { SnackbarCustom } from "../components/SnackbarCustom";


const SnackbarContext = createContext();

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snackbarProps, setSnackbarProps] = useState({
        open: false,
        text: '',
        status: 'ok',
    });

    const closeSnackbar = () => {
        setSnackbarProps({
            open: false,
            text: '',
            status: 'ok',
        });
    };

    const showSuccessLogin = () => {
        setSnackbarProps({
            open: true,
            text: 'Login success!',
            status: 'ok',
        });
    }

    const showFailLogin = () => {
        setSnackbarProps({
            open: true,
            text: 'Login failed. Try again',
            status: 'error',
        });
    }

    return (
        <SnackbarContext.Provider value={{ closeSnackbar, showSuccessLogin, showFailLogin }}>
            { children }
            <SnackbarCustom 
                active={snackbarProps.open}
                text={snackbarProps.text}
                status={snackbarProps.status}
                onClose={closeSnackbar}
            />
        </SnackbarContext.Provider>
    )
}