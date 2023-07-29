import React from 'react';
import { Box, Typography } from '@mui/material';
import { Burst } from '../../../types';
import { convertTime } from '../../../utils/convertTime';

export interface BurstProps {
    bursts: Burst[];
}


const Bursts = ({ bursts }: BurstProps) => (
    <>
        {bursts.map((b, i) => {
            const { burst, locations, initialBurst } = b;

            return (
                <Box key={`${burst}-${initialBurst}-${locations}`} sx={{ marginBlock: '10px' }}>
                    {initialBurst && <Typography key={`${initialBurst}-${i}`} sx={{ pb: 1 }}>{`Initial Burst: ${convertTime(initialBurst)}`}</Typography>}
                    <Typography sx={{ textDecoration: 'underline' }}>At times: </Typography>
                    <Box justifyContent={'flex-start'} display={'flex'} key={`${burst}-${initialBurst}-${i}`}>
                        {locations.map((location, i) => (
                            <Typography sx={{ pr: 1 }} key={`${location}-${i}`}>
                                {convertTime(location)}
                            </Typography>
                        ))}
                    </Box>
                    <Typography key={`${burst}-${i}`}>{`For ${convertTime(burst)}`}</Typography>
                </Box>
            );
        })}
    </>
);

export { Bursts };
