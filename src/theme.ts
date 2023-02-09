import { createTheme } from '@mui/material/styles';
import { purple, blue, grey, red, orange } from '@mui/material/colors';

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
                fontSize: '0.6rem'
            },
            '@media (min-width:600px)': {
                fontSize: '0.7rem'
            },
            '@media (min-width:900px)': {
                fontSize: '0.8rem'
            },
            '@media (min-width:1200px)': {
                fontSize: '0.9rem'
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
                    elevation: 0
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
            main: purple[500]
        },
        secondary: {
            main: blue[400]
        },
        error: {
            main: red[400]
        },
        info: {
            main: orange[400]
        },
        text: {
            primary: grey[100]
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
            main: purple[500]
        },
        secondary: {
            main: blue[400]
        },
        error: {
            main: red[400]
        },
        info: {
            main: orange[400]
        },
        text: {
            primary: grey[900]
        },
        tonalOffset: 0.2
    }
});
