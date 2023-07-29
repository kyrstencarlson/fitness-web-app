import { Pause, PlayArrowSharp, Square, Timer } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { IEngineWorkoutDay } from '../../../../../types';
import { convertTime } from '../../../utils/convertTime';
import CurrentRound from './CurrentRound';

export interface TimerProps {
    workouts: IEngineWorkoutDay['workout'][] | null;
    closeDialog: () => void;
}


const countdownSelect = [0, 3, 5, 10, 15, 20, 30, 45, 60];


const WorkoutTimer = ({ workouts, closeDialog }: TimerProps) => {

    const [countUp, setCountUp] = React.useState(true);
    const [counting, setCounting] = React.useState(false);

    const [timer, setTimer] = React.useState(0);
    const [round, setRound] = React.useState(0);
    const [work, setWork] = React.useState(0);
    const [rest, setRest] = React.useState(0);
    const [setrest, setSetRest] = React.useState(0);

    const [countdownIndex, setCountdownIndex] = React.useState(3);
    const countdown = countdownSelect[countdownIndex];

    const numberWorkouts = workouts?.length || 0;

    const [workoutIndex, setWorkoutIndex] = React.useState(0);
    const workout = workouts?.[workoutIndex];

    React.useEffect(() => {
        if (counting) {
            const interval = setInterval(() => {
                setTimer(timer => timer + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [counting]);

    return (
        <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12}>
                <IconButton
                    sx={{ float: 'right' }}
                    onClick={() => setCountdownIndex(countdownIndex === 8 ? 0 : countdownIndex + 1)}
                >
                    <Typography>{countdown}</Typography>
                    <Timer />
                </IconButton>
            </Grid>

            <CurrentRound workout={workout as IEngineWorkoutDay['workout']} />

            <Grid item
                xs={12}
                textAlign={'center'}
                mt={3}
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                    padding: '10px'
                }}>
                <Typography top={'50%'} variant={'h1'}>{convertTime(timer)}</Typography>
            </Grid>

            <Grid item xs={12} textAlign={'center'}>
                <IconButton onClick={() => setCounting(!counting)}>
                    {!counting && <PlayArrowSharp fontSize={'inherit'} sx={{ fontSize: '75px' }} />}
                    {counting && <Pause fontSize={'inherit'} sx={{ fontSize: '75px' }} />}
                </IconButton>
                <IconButton onClick={() => {
                    setCounting(false);
                    setTimer(0);
                }}>
                    <Square fontSize={'inherit'} sx={{ fontSize: '60px' }} />
                </IconButton>
            </Grid>
        </Grid>
    );
};


export default WorkoutTimer;
