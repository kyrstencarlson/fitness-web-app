import { Typography, Grid, CircularProgress, Box, Paper } from '@mui/material';
import React from 'react';
import { useGetAllWorkoutLogs } from '../../api';
import LeaderboardTable from './LeaderboardTable';

const Leaderboard = () => {

    const { data: logs, isLoading } = useGetAllWorkoutLogs();

    const formatted = logs && logs.map((log: any) => {

        const { first_name, last_name } = (log.user as any).profile || {};

        let name = '';
        if (!first_name && !last_name) {
            name = 'Anonymous';
        }
        if (first_name) {
            name = `${(log.user as any).profile?.first_name}`;
        }
        if (last_name) {
            name = `${name} ${(log.user as any).profile?.last_name}`;
        }

        return {
            ...log,
            day: log.workout.day,
            name
        };
    });

    if (!logs || isLoading) {
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

            {formatted && <LeaderboardTable logs={formatted as any} />}

        </Box>
    );
};


export default Leaderboard;
