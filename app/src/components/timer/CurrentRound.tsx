import { Delete, Pause, PlayArrowSharp, StartSharp, Timer, Timer10Select } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Field, Form, FormProps } from 'react-final-form';
import DropdownSelect from '../../utils/DropdownSelect';
import { toast } from '../../utils/alerts';
import { Workout } from '../../types';
import { convertTime } from '../../utils/convertTime';
import { IEngineWorkoutDay } from '../../../../types';


export const CurrentRound = ({ workout }: { workout: IEngineWorkoutDay['workout'] } ) => {

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
