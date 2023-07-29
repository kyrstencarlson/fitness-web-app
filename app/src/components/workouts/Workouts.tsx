import { Card, CardActionArea, CardContent, CardHeader, CircularProgress, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchUserWorkoutLogs, useGetCompletedMonths, useGetMonthsFormatted } from '../../api';
import { getAuth } from '../../utils/auth-provider';
import { IEngineWorkoutDay, IEngineWorkoutMonth } from '../../../../types';

interface SortedMonthsProps {
    array: IEngineWorkoutMonth[];
}

const Workouts = () => {

    const { _id } = getAuth();
    const navigate = useNavigate();
    const { data: months, isLoading } = useGetMonthsFormatted(_id);
    const { data: completed } = useGetCompletedMonths(_id);
    const { data: logs, isLoading: isLoadingLogs } = useFetchUserWorkoutLogs(_id);

    if (!months || isLoading || isLoadingLogs || !logs || !completed) {
        return (
            <Container sx={{ margin: '0 auto' }}>
                <CircularProgress />
            </Container>
        )
    }
    const completedDays = logs?.map(log => log.workout._id);

    const activeMonths = months.filter(month => !completed.includes(month[0].month));
    const completedMonths = months.filter(month => completed.includes(month[0].month));

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography fontWeight={'600'} textAlign={'center'} variant='h4' mb={1}>
                        Active
                    </Typography>
                </Grid>

                {activeMonths.map((days, i) => {
                    if (!days.length) { return null; }
                    const completed = days.filter(day => completedDays?.includes(day._id)).length;
                    const number = days[0]?.month;


                    return (
                        <Grid item key={i} xs={12} md={4}>
                            <Card>
                                <CardActionArea onClick={() => navigate(`/engine/workouts/${number}`)}>
                                    <CardHeader subheader={<Typography variant='h6' mb={0}>Month {number}</Typography>}/>
                                    <CardContent>
                                        <Typography variant='h5' mb={2}>
                                            {completed} / {days.length}
                                        </Typography>
                                        <LinearProgress variant='determinate' value={(completed / 20) * 100} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}

                {completedMonths && completedMonths.length > 1 && <>
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

                    {completedMonths.map((days, i) => {
                        if (!days.length) { return null; }
                        const completed = days.filter(day => completedDays?.includes(day._id)).length;
                        const number = days[0]?.month;


                        return (
                            <Grid item key={i} xs={12} md={4}>
                                <Card>
                                    <CardActionArea onClick={() => navigate(`/engine/workouts/${number}`)}>
                                        <CardHeader subheader={<Typography variant='h6' mb={0}>Month {number}</Typography>}/>
                                        <CardContent>
                                            <Typography variant='h5' mb={2}>
                                                {completed} / {days.length}
                                            </Typography>
                                            <LinearProgress variant='determinate' value={(completed / 20) * 100} />
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
