import { Card, CardActionArea, CardContent, CardHeader, CircularProgress, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCompletedMonths, useGetMonthsFormatted } from '../../api';
import { getAuth } from '../../utils/auth-provider';

const Workouts = () => {

    const { _id } = getAuth();
    const navigate = useNavigate();
    const { data: months, isLoading } = useGetMonthsFormatted();
    const { data: completed } = useGetCompletedMonths(_id);

    if (!months || isLoading) {
        return <CircularProgress />;
    }

    const sortedMonths = months.map((month, i) => ({
        complete: month.filter(day => completed?.includes(day.month)).length,
        total: month.length
    }));


    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography fontWeight={'600'} textAlign={'center'} variant='h4' mb={1}>
                        Active
                    </Typography>
                </Grid>

                {sortedMonths.map((month, i) => {
                    const complete = month.complete / month.total;

                    if (complete === 1) return null;

                    return (
                        <Grid item key={i} xs={12} md={4}>
                            <Card>
                                <CardActionArea onClick={() => navigate(`/engine/workouts/${i + 1}`)}>
                                    <CardHeader subheader={<Typography variant='h6' mb={0}>Month {i + 1}</Typography>}/>
                                    <CardContent>
                                        <Typography variant='h5' mb={2}>
                                            {month.complete} / {month.total}
                                        </Typography>
                                        <LinearProgress variant='determinate' value={complete * 100} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}

                {completed && <>
                    <Grid item xs={12} sx={{
                        mt: 4,
                        mb: 2
                    }}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography fontWeight={'600'} textAlign={'center'} variant='h4' mb={1}>
                            Completed
                        </Typography>
                    </Grid>

                    {sortedMonths.map((month, i) => {
                        const complete = month.complete / month.total;

                        if (complete !== 1) return null;

                        return (
                            <Grid item key={i} xs={12} md={4}>
                                <Card>
                                    <CardActionArea onClick={() => navigate(`/engine/workouts/${i + 1}`)}>
                                        <CardHeader subheader={<Typography variant='h6' mb={0}>Month {i + 1}</Typography>}/>
                                        <CardContent>
                                            <Typography variant='h5' mb={2}>
                                                {month.complete} / {month.total}
                                            </Typography>
                                            <LinearProgress variant='determinate' value={complete * 100} />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </>}
            </Grid>
        </Container>
    );
};


export default Workouts;
