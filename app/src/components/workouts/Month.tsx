import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { allDaysFormatted } from '../../data/data';
import { getMonths } from '../../utils/getMonths';
import { getWeeksFromMonth } from '../../utils/getWeeksFromMonth';
import Week from './Week';
import { allDays } from '../../data/import';
import { reshapeData } from '../../data/script';

// const data = reshapeData(allDays);
// export const months = getMonths(data);

export const months = getMonths(allDaysFormatted);

const Month = () => {

    const { pathname } = useLocation();
    const m = pathname.split('/')[2];
    const month = months[+m - 1].flat();
    const weeks = getWeeksFromMonth(month);

    return (
        <Container>
            <Grid container spacing={4} sx={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Grid item xs={12}>
                    <Typography textAlign={'center'} fontWeight={'600'} variant={'h4'}>Month {m}</Typography>
                </Grid>

                {weeks.map((week, i) => {
                    const month = week[0].month;

                    return (
                        <Grid key={`${month}-week${i+1}`} item xs={12}>
                            <Typography variant='h6' sx={{ pl: 1, pb: 1}}>Week {i + 1}</Typography>
                            <Week week={week} />
                        </Grid>
                    )})
                }
            </Grid>
        </Container>
    );
};


export default Month;
