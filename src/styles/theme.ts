'use client'

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        primary: {
            main: '#2e7d32', 
            light: '#60ad5e',
            dark: '#005005',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ffb300', 
            light: '#ffe54c',
            dark: '#c68400',
            contrastText: '#000',
        },
        error: {
            main: red.A400, 
        },
        background: {
            default: '#f8f9fa', 
            paper: '#ffffff',   
        },
    },
    typography: {
        fontFamily: [
            'Roboto', 
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', 
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3f51b5', 
                    
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true, 
            },
            styleOverrides: {
                root: {
                    borderRadius: 8, 
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12, 
                    boxShadow: '0px 4px 20px rgba(0, 0,0, 0.05)', 
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12, 
                },
            },
        },
    },
});

export default theme;