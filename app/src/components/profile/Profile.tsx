import { Typography, Grid, Paper, CircularProgress } from '@mui/material';
import React from 'react';
import { useFetchUser, useGetUserProfile } from '../../api';
import { useAuth } from '../../utils/AuthContext';

const Profile = () => {

    const { _id } = useAuth();
    const { data: user, isLoading } = useFetchUser(_id as string, { enabled: !!_id });

    const mobile = window.innerWidth < 650;

    if (!user || isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Grid item xs={12} sx={{ mb: 2}}>
                <Typography textAlign={'center'} fontWeight={'600'} variant={'h4'}>
                    Profile
                </Typography>
            </Grid>

            <Paper sx={{
                p: 2,
                margin: mobile ?  'auto' : 4,
                flexGrow: 1
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='h5' component='h2'>
                            Name
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {user.profile?.first_name} {user.profile?.last_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' component='h2'>
                            Email
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            {user.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' component='h2'>
                            Birthday
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            {user.profile?.birthday as any}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' component='h2'>
                            Gender
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            {user.profile?.gender}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' component='h2'>
                            Height
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {user.profile?.height}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' component='h2'>
                            Weight
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {user.profile?.weight}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};


export default Profile;
