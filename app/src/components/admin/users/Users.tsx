import { Typography, Grid, CircularProgress, Box, Paper } from '@mui/material';
import React from 'react';
import { useFetchAllUsers, useFetchUser, useGetAllWorkoutLogs } from '../../../api';
import UsersTable from './UserTable';
import { IUser } from '../../../../../types';


const Users = () => {

    const { data: users, isLoading } = useFetchAllUsers();

    const formatted = users && users.map((user: IUser) => {

        const { first_name, last_name } = (user as any).profile || {};

        let name = '';
        if (!first_name && !last_name) {
            name = 'Anonymous';
        }
        if (first_name) {
            name = `${(user).profile?.first_name}`;
        }
        if (last_name) {
            name = `${name} ${(user).profile?.last_name}`;
        }

        return {
            ...user,
            name
        };
    });

    if (!users || isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{
            margin: 'auto',
            minWidth: 380,
            maxWidth: 1000
        }}>

            <Grid container>
                <Grid item xs={12}>
                    <Typography textAlign={'center'} variant='h4' component='div' gutterBottom>
                        Leaderboard
                    </Typography>
                </Grid>
            </Grid>

            <Box mt={4} />

            {formatted && <UsersTable users={formatted as any} />}

        </Box>
    );
};


export default Users;
