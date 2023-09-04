import { Grid, Typography } from '@mui/material';
import React from 'react';
import { IEngineWorkoutDay } from '../../../../../types';


export const CurrentRound = ({ workout }: { workout: IEngineWorkoutDay['workout'] }) => {

    const [countUp, setCountUp] = React.useState(true);
    const [counting, setCounting] = React.useState(false);

    const [timer, setTimer] = React.useState(0);
    const [round, setRound] = React.useState(0);
    const [work, setWork] = React.useState(0);
    const [rest, setRest] = React.useState(0);
    const [setrest, setSetRest] = React.useState(0);

    const [countdownIndex, setCountdownIndex] = React.useState(3);


    return (
        <Grid item xs={12} textAlign={'center'}>
            <Typography variant={'h4'}>Round: {round}</Typography>
        </Grid>
    );
};


export default CurrentRound;
