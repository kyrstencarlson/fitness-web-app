import React from 'react';
import { Box, Typography } from '@mui/material';
import { convertTime } from '../../utils/convertTime';
import { Cycle } from '../../types';

export interface CycleProps {
    cycles: Cycle[];
}


const Cycles = ({ cycles }: CycleProps) => (
    <>
        {cycles.map((cycle, i) => {
            const { work, rest } = cycle;

            return (
                <Box key={`${work}-${rest}-${i}`}  justifyContent={'flex-start'} display={'flex'}  sx={{ marginBlock: '10px' }}>
                    <Typography textTransform={'capitalize'} sx={{ pr: 1}}>
                        Work: {convertTime(work)}
                    </Typography>

                    {rest && <Typography>Rest: {convertTime(rest)}</Typography>}
                </Box>
            );
        })}
    </>
);

export { Cycles };
