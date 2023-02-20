import { Typography, Grid, Container, Card, CardActionArea, CardContent, CardHeader, LinearProgress } from '@mui/material';
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
                {months.map((month, i) => {

                    const complete = month.complete / month.total;

                    return (
                        <Grid item xs={12} md={4} spacing={2}>
                            <Card>
                                <CardActionArea onClick={() => navigate(`/workouts/month-${i}`)}>
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
