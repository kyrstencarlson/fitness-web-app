import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => (
    <div id='error-page'>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography sx={{ mt: '25vh' }} variant='h3'>Oops!</Typography>
            <Typography variant='body1'>Sorry, an unexpected error has occurred.</Typography>

            <Link to='/'>Home</Link>
        </Box>
    </div>
);
