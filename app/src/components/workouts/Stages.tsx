import React from 'react';
import { Box, Typography } from '@mui/material';
import { convertTime } from '../../utils/convertTime';
import { Stage } from '../../types';

export interface StageProps {
    stages: Stage[];
}


const Stages = ({ stages }: StageProps) => (
    <>
        {stages.map((stage, i) => {
            const { increase, time, locations } = stage;

            const forTime = () => {
                if (typeof time === 'string') {
                    return time;
                }

                return `For ${convertTime(time)}`;
            };

            const forIncrease = () => {
                if (typeof increase === 'string') {
                    return increase;
                }

                return `Increase ${increase}%`;
            };

            return (
                <Box sx={{ marginBlock: '10px' }}>
                    <Typography>At times: </Typography>
                    <Box justifyContent={'flex-start'} display={'flex'} key={`${increase}-${time}-${i}`}>
                        {locations.map((location, i) => (
                            <Typography sx={{ pr: 1 }} key={`${location}-${i}`}>
                                {convertTime(location)}
                            </Typography>
                        ))}
                    </Box>
                    <Typography key={`${increase}-${i}`}>{forIncrease()}</Typography>
                    <Typography key={`${time}-${i}`}>{forTime()}</Typography>
                </Box>
            );
        })}
    </>
);

export { Stages };
