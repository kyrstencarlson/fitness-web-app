import { Typography, Grid, Container, Card, Accordion, AccordionDetails, AccordionSummary, useTheme } from '@mui/material';
import React from 'react';
import ContentCard from '../../utils/Card';
import { Check, ExpandMore } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const week1 = [
    {
        name: 'Day 1',
        type: 'Endurance'
    },
    {
        name: 'Day 2',
        type: 'Speed / Threshold'
    }
];

const week2 = [
    {
        name: 'Day 3',
        type: 'Max Aerobic Power'
    },
    {
        name: 'Day 4',
        type: 'Anaerobic'
    }
];

const week3 = [
    {
        name: 'Day 5',
        type: 'Endurance'
    },
    {
        name: 'Day 6',
        type: 'Intervals'
    }
];

const week4 = [
    {
        name: 'Day 7',
        type: 'Rest'
    }
];


export const month = [week1, week2, week3, week4];

const Month = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const m = pathname.split('/')[2];

    return (
        <Container>
            <Grid container spacing={4} sx={{
                alignItems: 'center',
                mt: 0.5,
                justifyContent: 'center'
            }}>
                <Grid item xs={12}>
                    <Typography variant={'h4'}>Month {m}</Typography>
                </Grid>

                {month.map((weeks, i) => (
                    <Grid item xs={12}>
                        <ContentCard
                            header={`Week ${i + 1}`}
                            body={`${weeks.length} / ${weeks.length * 2} Completed`}
                            onClick={() => navigate(`/workouts/${m}/${i + 1}`)}
                        />
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
};


export default Month;
