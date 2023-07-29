import { EditSharp } from '@mui/icons-material';
import { Box, CircularProgress, Dialog, DialogContent, Grid, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { useFetchUser } from '../../api';
import { useAuth } from '../../utils/AuthContext';
import ProfileForm, { ProfileFormProps } from './ProfileForm';
import PasswordForm from './PasswordForm';

const Profile = () => {

    const { _id } = useAuth();
    const { data: user, isLoading } = useFetchUser(_id as string, { enabled: !!_id });

    const mobile = window.innerWidth < 650;

    const [edit, setEdit] = React.useState(false);
    const [password, setPassword] = React.useState(false);

    if (!user || isLoading) {
        return <CircularProgress />;
    }


    return (
        <>
            <Paper elevation={3} sx={{
                p: 3,
                margin: 'auto',
                minWidth: 380,
                maxWidth: 1000,
                flexGrow: 1
            }}>

                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={11}>
                        <Typography variant='h4' component='div' gutterBottom>
                            Profile
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton sx={{ textAlign: 'right' }} onClick={() => setEdit(!edit)}>
                            <EditSharp sx={{ textAlign: 'right' }} />
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

            <Paper elevation={3} sx={{
                p: 3,
                margin: 'auto',
                minWidth: 380,
                maxWidth: 1000,
                flexGrow: 1
            }}>

                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={11}>
                        <Typography variant='h4' component='div' gutterBottom>
                            Change Password
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label='edit' onClick={() => setPassword(!password)}>
                            <EditSharp />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={edit} onClose={() => setEdit(false)} fullWidth maxWidth='md'>
                <DialogContent>
                    <ProfileForm
                        initialValues={{ user }}
                        closeDialog={() => setEdit(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={password} onClose={() => setPassword(false)} fullWidth maxWidth='md'>
                <DialogContent>
                    <PasswordForm
                        initialValues={{ user }}
                        closeDialog={() => setPassword(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};


export default Profile;
