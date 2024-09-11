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
        chrome.identity.getAuthToken({ interactive: true }, (token: string | undefined) => {
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Job Listings Saver
                        </Typography>
                        <IconButton color="inherit" onClick={handleAuthenticate}>
                            <LoginIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p:2, flexGrow: 1, overFlowY: 'auto' }}>
                    <TextField 
                        fullWidth
                        label="Google Sheets ID"
                        value={spreadsheetId}
                        onChange = {(e) => setSpreadsheetId(e.target.value)}
                        margin ="normal"
                        variant="outlined"
                    />
                    <TextField 
                        fullWidth
                        label="Job Title"
                        value={jobTitle}
                        onChange = {(e) => setJobTitle(e.target.value)}
                        margin="normal"
                        variant='outlined'
                    />
                    <TextField 
                        fullWidth
                        label="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        fullWidth
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
               </Box>
               <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                >
                    Save Listings
                </Button>
               </Box>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </ThemeProvider>
    );
};

export default Popup;
