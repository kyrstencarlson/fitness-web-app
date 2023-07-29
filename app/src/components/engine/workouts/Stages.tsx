import React from 'react';
import { Box, Typography } from '@mui/material';
import { convertTime } from '../../../utils/convertTime';
import { Stage } from '../../../types';

export interface StageProps {
    stages: Stage[];
}


const Stages = ({ stages }: StageProps) => (
    <>
        {stages.map(stage => {
            const { increase, time, locations } = stage;

            return (
                <Box key={`${increase}-${time}-${locations}`} sx={{ marginBlock: '10px' }}>
                    <Typography sx={{ textDecoration: 'underline' }}>At times: </Typography>
                    <Box justifyContent={'flex-start'} display={'flex'}>
                        {locations.map((location, i) => (
                            <Typography key={`${increase}-${time}-${location}-${i}`} sx={{ pr: 1 }}>
                                {convertTime(location)}
                            </Typography>
                        ))}
                    </Box>
                    <Typography>{`Increase ${increase}`}</Typography>
                    <Typography>{`For ${convertTime(time)}`}</Typography>
                </Box>
            );
        })}
    </>
);

export { Stages };
