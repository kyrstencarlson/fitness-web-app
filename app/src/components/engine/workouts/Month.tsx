import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchMonth } from '../../../api';
import Week from './Week';


const Month = () => {

    const { pathname } = useLocation();
    const m = pathname.split('/')[3];
    const { data: weeks, isLoading } = useFetchMonth(+m);

    if (!weeks || isLoading) {
        return <CircularProgress />;
    }


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
                        <Grid key={`${month}-week${i + 1}`} item xs={12}>
                            <Typography variant='h6' sx={{
                                pl: 1,
                                pb: 1
                            }}>
                                Week {i + 1}
                            </Typography>
                            <Week week={week} />
                        </Grid>
                    );
                })
                }
            </Grid>
        </Container>
    );
};


export default Month;
