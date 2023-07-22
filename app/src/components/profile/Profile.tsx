import { Typography, Grid, Paper, CircularProgress, IconButton, Box } from '@mui/material';
import { EditSharp, Save } from '@mui/icons-material';
import React from 'react';
import { useFetchUser, useGetUserProfile } from '../../api';
import { useAuth } from '../../utils/AuthContext';

const Profile = () => {

    const { _id } = useAuth();
    const { data: user, isLoading } = useFetchUser(_id as string, { enabled: !!_id });

    const mobile = window.innerWidth < 650;

    const [edit, setEdit] = React.useState(false);
    const [password, setPassword] = React.useState(false);

    if (!user || isLoading) {
        return <CircularProgress />;
    }

    if (edit) {
        return (
            <Paper elevation={3} sx={{ p: 3, margin: 'auto', minWidth: 380, maxWidth: 1000, flexGrow: 1 }}>
                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={11}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Profile
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label="edit" onClick={() => setEdit(!edit)}>
                            <Save />
                        </IconButton>
                    </Grid>
                </Grid>

                <Typography>
                    Edit
                </Typography>
            </Paper>
        )
    }

    return (
        <>
            <Paper elevation={3} sx={{ p: 3, margin: 'auto', minWidth: 380, maxWidth: 1000, flexGrow: 1 }}>

                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={11}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Profile
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label="edit" onClick={() => setEdit(!edit)}>
                            <EditSharp />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container spacing={3} mt={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            First Name
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {user.profile?.first_name ?? 'N/A'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            Last Name
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {user.profile?.last_name ?? 'N/A'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            Email
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {user.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            height
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {user.profile?.height ?? 'N/A'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            weight
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {user.profile?.weight ?? 'N/A'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            gender
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {user.profile?.gender ?? 'N/A'}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box mt={4} />

            <Paper elevation={3} sx={{ p: 3, margin: 'auto', minWidth: 380, maxWidth: 1000, flexGrow: 1 }}>

                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={11}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Change Password
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label="edit" onClick={() => setPassword(!password)}>
                            <EditSharp />
                        </IconButton>
                    </Grid>
                </Grid>

               {password &&  <Grid container spacing={3} mt={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            Current Password
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {/* {profile.firstName} */}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            New Password
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {/* {profile.lastName} */}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' mb={0}>
                            Confirm New Password
                        </Typography>
                        <Typography variant='body1' mb={2}>
                            {/* {profile.lastName} */}
                        </Typography>
                    </Grid>
                </Grid>}
            </Paper>
        </>
    );
};


export default Profile;
