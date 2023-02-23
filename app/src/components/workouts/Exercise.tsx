import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { convertTime } from '../../utils/convertTime';
import pluralize from 'pluralize';
import { Workout } from '../../types';
import { Stages } from './Stages';


export interface ExerciseProps {
    workouts: Workout[]
}

const Exercise = ({ workouts }: ExerciseProps) => (
    <>
        {workouts.map((workout, i) => {

            const {
                rounds, work, rest, pace, setRest, comment, stages
            } = workout;
            const length = workouts.length;
            const isLast = length - 1 === i;

            return (
                <React.Fragment key={`${rounds}-${work}-${rest}`}>
                    <Box>
                        <Typography>{rounds} {rounds === 1 ? 'Round' : 'Rounds'}</Typography>

                        <Typography textTransform={'capitalize'}>
                            Work: {convertTime(work)} @ {pace}
                        </Typography>

                        {rest && <Typography>Rest: {convertTime(rest)}</Typography>}

                        {stages && <Stages stages={stages} />}

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
