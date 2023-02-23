import { Typography, Grid, Container, Divider } from '@mui/material';
import React from 'react';
import ContentCard from '../../utils/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { month1, month2, month3 } from '../../data/data';
import { getWeeksFromMonth } from '../../utils/getWeeksFromMonth';

export const months = [month1, month2, month3];

const Month = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const m = pathname.split('/')[2];
    const month = months[+m - 1];

    const weeks = getWeeksFromMonth(month);

    return (
        <Container>
            <Grid container spacing={4} sx={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>Month {m}</Typography>
                </Grid>

                {weeks.map((week, i) => (
                    <Grid key={i} item xs={12}>
                        <ContentCard
                            // complete={week.filter(w => w.complete)}
                            header={`Week ${i + 1}`}
                            body={`${0} / ${week.length} Completed`}
                            onClick={() => navigate(`/workouts/${m}/${i + 1}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};


export default Month;
