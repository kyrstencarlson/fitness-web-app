import { Typography, Grid, Container, Card, CardActionArea, CardContent, CardHeader, LinearProgress, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const months = [
    {
        complete: 10,
        total: 10
    },
    {
        complete: 3,
        total: 10
    },
    {
        complete: 0,
        total: 10
    }
];

const Home = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Grid container spacing={3} mt={2}>

                <Grid item xs={12}>
                    <Typography variant='h4' mb={1}>
                        Active
                    </Typography>
                </Grid>

                {months.map((month, i) => {
                    const complete = month.complete / month.total;

                    if (complete === 1) return null;

                    return (
                        <Grid item key={i} xs={12} md={4}>
                            <Card>
                                <CardActionArea onClick={() => navigate(`/workouts/${i + 1}`)}>
                                    <CardHeader subheader={<Typography variant='h6' mb={0}>Month {i + 1}</Typography>}/>
                                    <CardContent>
                                        <Typography variant='h5' mb={2}>
                                            {complete * 100}%
                                        </Typography>
                                        <LinearProgress variant='determinate' value={complete * 100} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}

                <Grid item xs={12} sx={{
                    mt: 4,
                    mb: 2
                }}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h4' mb={1}>
                        Completed
                    </Typography>
                </Grid>

                {months.map((month, i) => {
                    const complete = month.complete / month.total;

                    if (complete !== 1) return null;

                    return (
                        <Grid item key={i} xs={12} md={4}>
                            <Card>
                                <CardActionArea onClick={() => navigate(`/workouts/${i}`)}>
                                    <CardHeader subheader={<Typography variant='h6' mb={0}>Month {i + 1}</Typography>}/>
                                    <CardContent>
                                        <Typography variant='h5' mb={2}>
                                            {complete * 100}%
                                        </Typography>
                                        <LinearProgress variant='determinate' value={complete * 100} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};


export default Home;
