import { Box, CircularProgress, FormControlLabel, FormGroup, Grid, Paper, Switch, Typography } from '@mui/material';
import React from 'react';
import { useFetchUserWorkoutLogs } from '../../api';
import { useAuth } from '../../utils/AuthContext';
import FilterForm from './FilterForm';
import ResultBarChart from './ResultBarChart';
import ResultLineChart from './ResultLineChart';
import ResultTable from './ResultTable';

const Results = () => {

    const { _id } = useAuth();
    const { data: logs, isLoading } = useFetchUserWorkoutLogs(_id as string, { enabled: !!_id });

    const [filtered, setFiltered] = React.useState<any>(logs);
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    const formatted = logs && logs.map((log: any) => ({
        ...log,
        day: log.workout.day
    }));

    React.useEffect(() => {
        setFiltered(formatted);
    }, [logs]);


    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{
            margin: 'auto',
            minWidth: 380,
            maxWidth: 1000
        }}>

            <Paper elevation={3} sx={{
                p: 3,
                margin: 'auto',
                minWidth: 380,
                maxWidth: 1000,
                flexGrow: 1
            }}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography textAlign={'center'} variant='h4' component='div' gutterBottom>
                            Results
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                    />
                                }
                                label='Bar Chart'
                            />
                        </FormGroup>

                    </Grid>

                    <Grid item xs={12}>
                        {logs && <FilterForm
                            filtered={filtered}
                            setFiltered={setFiltered}
                            logs={logs}
                        />}
                    </Grid>
                </Grid>

                <Box mt={4} />

                {checked ? <ResultBarChart logs={filtered} /> : <ResultLineChart logs={filtered} />}

            </Paper>

            <Box mt={4} />

            {formatted && <ResultTable logs={formatted as any} />}

        </Box>
    );
};


export default Results;
