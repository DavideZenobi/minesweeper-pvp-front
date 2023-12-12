import { Snackbar, Alert } from "@mui/material";

export const CustomSnackbar = ({ open, severity, message, onClose }) => {

    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={severity} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};
