import { BarChart, Edit, ExpandMore, History, InfoOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IEngineWorkoutDay, IEngineWorkoutLogBase } from '../../../../../types';
import { definitions } from '../../../data/definitions';
import ToolTipIcon from '../../../utils/ToolTipIcon';
import { Exercise } from './Exercise';
import { SubmitFormProps } from './SubmitForm';

export interface DayProps {
    user_id: string;
    day: IEngineWorkoutDay;
    timerOpen: boolean;
    setWorkouts: (value: IEngineWorkoutDay['workout']) => void;
    setInitialValues: (value: SubmitFormProps['initialValues']) => void;
    setOpen: (value: boolean) => void;
    setTimerOpen: (value: boolean) => void;
    log?: IEngineWorkoutLogBase
    totalWork?: number;
}

const Day = (props: DayProps) => {

    const {
        user_id, day, log, setTimerOpen, setWorkouts, timerOpen, setInitialValues, setOpen
    } = props;
    const navigation = useNavigate();

    const windowSize = window.innerWidth;
    const mobile = windowSize < 650;
    const fontSize = mobile ? 'small' : 'medium';

    const totalWork = day.workout.reduce((acc, curr) => acc + curr.totalWork, 0) / 60;
    const def = definitions.find(def => day.type.includes(def.type))?.description;

    return (
        <>
            <Accordion key={`${day.day}`} sx={{ alignContent: 'center' }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                >
                    <Typography
                        sx={{
                            width: '15%',
                            flexShrink: 0,
                            alignSelf: 'center'
                        }}
                    >
                                Day {day.day}
                    </Typography>

                    <Typography color={'text.secondary'} textTransform={'capitalize'}
                        sx={{
                            width: '70%',
                            alignSelf: 'center'
                        }}>
                        {day.type}
                    </Typography>

                    <Typography color={'text.secondary'} sx={{
                        width: '10%',
                        alignSelf: 'center'
                    }}>
                        {log && `Pace: ${log.score / totalWork}`}
                    </Typography>

                    <ToolTipIcon
                        text={def as string}
                        icon={<InfoOutlined sx={{ height: '20px' }} />}
                        placement='bottom-start'
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={9.5}>
                            <Exercise workouts={day.workout} />
                        </Grid>

                        <Grid item xs={2.5} textAlign={'right'}>
                            {/* <ToolTipIcon
                                        icon={<Timer fontSize={fontSize}/>}
                                        text={'Timer'}
                                        onClick={() => {
                                            setTimerOpen(!timerOpen)
                                            setWorkouts(day.workout);
                                        }}
                                    /> */}
                            <ToolTipIcon icon={<BarChart fontSize={fontSize}/>} text={'Leaderboard'} onClick={() => navigation('/leaderboard')} />
                            <ToolTipIcon icon={<History fontSize={fontSize} />} text={'History'} onClick={() => navigation('/results')} />
                            <ToolTipIcon
                                icon={<Edit fontSize={fontSize} />}
                                text={'Submit / Edit'}
                                onClick={() => {
                                    setOpen(true);
                                    setInitialValues({
                                        user_id,
                                        workout: day,
                                        log,
                                        totalWork
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Day;
