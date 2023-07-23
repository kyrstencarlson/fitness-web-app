import { Filter } from '@mui/icons-material';
import { Typography, Grid, Tooltip, Paper, Box, CircularProgress } from '@mui/material';
import React from 'react';
import { LineChart, XAxis, CartesianGrid, Line, YAxis } from 'recharts';
import FilterForm from './FilterForm';
import { useFetchUserWorkoutLogs } from '../../api';
import { useAuth } from '../../utils/AuthContext';
import { IEngineWorkoutLog, IEngineWorkoutLogBase } from '../../../../types';

const Results = () => {

    const { _id } = useAuth();
    const { data: logs, isLoading } = useFetchUserWorkoutLogs(_id as string, { enabled: !!_id });

    const dummy = [
        {
            workout_month: 1,
            workout_type: 'endurance',
            modality: 'row',
            units: 'meters'
        },
        {
            workout_month: 1,
            workout_type: 'endurance',
            modality: 'bike',
            units: 'meters'
        },
        {
            workout_month: 1,
            workout_type: 'endurance',
            modality: 'run',
            units: 'meters'
        },
        {
            workout_month: 1,
            workout_type: 'endurance',
            modality: 'row',
            units: 'calories'
        },
        {
            workout_month: 2,
            workout_type: 'endurance',
            modality: 'bike',
            units: 'calories'
        },
        {
            workout_month: 2,
            workout_type: 'endurance',
            modality: 'run',
            units: 'calories'
        }
    ];
    const [filtered, setFiltered] = React.useState<any>(dummy);

    console.log(filtered);

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        }
    ];

    if (isLoading) {
        return <CircularProgress />;
    }

    return (

        <Paper elevation={3} sx={{
            p: 3,
            margin: 'auto',
            minWidth: 380,
            maxWidth: 1000,
            flexGrow: 1
        }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography textAlign={'center'} variant='h4' component='div' gutterBottom>
                        Results
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <FilterForm
                        filtered={filtered}
                        setFiltered={setFiltered}
                    />
                </Grid>
            </Grid>

            <Box mt={4} />

            {data &&
                <LineChart width={500} height={300} data={data} style={{ margin: '0 auto' }}>
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />
                    <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
                </LineChart>
            }
        </Paper>
    );
};


export default Results;
