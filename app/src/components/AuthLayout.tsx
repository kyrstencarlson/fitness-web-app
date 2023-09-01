import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../theme';


const AuthLayout = ({ children }:{children: JSX.Element}) => (
    <ThemeProvider theme={lightTheme}>
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/5650ba65e4b0e332af39118e/db2ea7ab-57c9-460a-9159-f8e0f0975655/Gains+Lab+Logo.png?format=1500w)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {children}

        </Grid>
    </ThemeProvider>
);
export default AuthLayout;
