import React, { useState, useEffect } from 'react';
import {
    Button, TextField, Typography, Box, ThemeProvider, createTheme,
    CssBaseline, AppBar, Toolbar, IconButton, Snackbar
} from '@mui/material';
import { Save as SaveIcon, Login as LoginIcon } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#4caf50',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

const Popup: React.FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [jobTitle, setJobTitle] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [spreadsheetId, setSpreadsheetId] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    useEffect(() => {
        chrome.identity.getAuthToken({ interactive: false }, (token: string | undefined) => {
            if (token) {
                setAuthenticated(true);
                setSnackbarMessage('Authenticated');
                setSnackbarOpen(true);
            }
        });
    }, []);

    const handleAuthenticate = () => {
        Chrome.identity.getAuthToken({ interactive: true }, (token: string | undefined) => {
            if (token) {
                setAuthenticated(true);
                setSnackbarMessage('Authentication successful');
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage('Authentication failed');
                setSnackbarOpen(true);
            }
        });
    };

    const handleSave = () => {
        if (!authenticated) {
            setSnackbarMessage('Please authenticate first');
            setSnackbarOpen(true);
            return;
        }

        if (!spreadsheetId || !jobTitle || !company || !url) {
            setSnackbarMessage('Please fill all the fields');
            setSnackbarOpen(true);
            return;
        }

        // Implement saving to Google Sheets here
        setSnackbarMessage('Saving to Google Sheets...');
        setSnackbarOpen(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ width: 350, height: 500, display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typograhy variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Job Listings Saver
                        </Typography>
                        <IconButton>
                            <LoginIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>




            </Box>





        </ThemeProvider>
    )
}
