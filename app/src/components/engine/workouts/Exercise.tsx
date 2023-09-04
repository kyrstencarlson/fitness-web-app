import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Workout } from '../../../types';
import { convertTime } from '../../../utils/convertTime';
import { Bursts } from './Bursts';
import { Cycles } from './Cycles';
import { Stages } from './Stages';


export interface ExerciseProps {
    workouts: Workout[]
}

const Exercise = ({ workouts }: ExerciseProps) => (
    <>
        {workouts.map((workout, i) => {

            const {
                rounds, work, rest, pace, setRest, comment, stages, bursts, cycles
            } = workout;
            const length = workouts.length;
            const isLast = length - 1 === i;

            return (
                <React.Fragment key={`${rounds}-${work}-${rest}-${i}`}>
                    <Box>
                        <Typography sx={{ fontWeight: '700' }}>{rounds} {rounds === 1 ? 'Round' : 'Rounds'} {cycles && 'as'}</Typography>
                        {work && <Typography textTransform={'capitalize'}>Work: {convertTime(work)} {pace && `@ ${pace}`}</Typography>}
                        {rest && <Typography>Rest: {convertTime(rest)}</Typography>}
                        {stages && <Stages stages={stages} />}
                        {bursts && <Bursts bursts={bursts} />}
                        {cycles && <Cycles cycles={cycles} />}
                        {comment && <Typography sx={{ paddingBlock: '10px' }}>{comment}</Typography>}
                    </Box>

                    {length > 1 && !isLast &&
                        <Divider sx={{
                            marginBlock: '10px',
                            width: '40%'
                        }}>
                            {setRest ? `Rest: ${convertTime(setRest)}` : ''} Then
                        </Divider>
                    }

                </React.Fragment>
            );
        })}
    </>
);

export { Exercise };
