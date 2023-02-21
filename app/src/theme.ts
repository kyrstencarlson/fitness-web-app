import { createTheme } from '@mui/material/styles';
import { green, blue, grey, red, orange } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h6: {
            textTransform: 'uppercase',
            fontSize: '18px',
            lineHeight: -1,
            letterSpacing: '1px',
            wordSpacing: '3px'
        },
        body1: {
            '@media (min-width:0px)': {
                fontSize: '0.9rem'
            },
            '@media (min-width:600px)': {
                fontSize: '0.9rem'
            },
            '@media (min-width:900px)': {
                fontSize: '0.925rem'
            },
            '@media (min-width:1200px)': {
                fontSize: '0.95rem'
            },
            '@media (min-width:1536px)': {
                fontSize: '1rem'
            }
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            }
        },
        MuiDialog: {
            defaultProps: {
                PaperProps: {
                    elevation: 1
                }
            }
        }
    }
});

export const darkTheme = createTheme({
    ...theme,
    palette: {
        mode: 'dark',
        background: {
            paper: grey[800],
            default: grey[900]
        },
        primary: {
            main: blue[400]
        },
        secondary: {
            main: green[400]
        },
        error: {
            main: red[400]
        },
        info: {
            main: orange[400]
        },
        text: {
            primary: grey[100],
            secondary: grey[300]
        },
        grey: {
            50: grey[50],
            100: grey[100],
            200: grey[200],
            300: grey[300],
            400: grey[400],
            500: grey[500],
            600: grey[600],
            700: grey[700],
            800: grey[800],
            900: grey[900]
        },
        tonalOffset: 0.2
    }
});

export const lightTheme = createTheme({
    ...theme,
    palette: {
        mode: 'light',
        background: {
            paper: grey[300],
            default: grey[100]
        },
        primary: {
            main: blue[400]
        },
        secondary: {
            main: green[400]
        },
        error: {
            main: red[400]
        },
        info: {
            main: orange[400]
        },
        text: {
            primary: grey[900],
            secondary: grey[700]
        },
        grey: {
            500: grey[500]
        },
        tonalOffset: 0.2
    }
});
