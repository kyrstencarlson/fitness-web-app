import { BarChart, Edit, ExpandMore, History, InfoOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IEngineWorkoutDay } from '../../../../types';
import { useFetchUserWorkoutLogs } from '../../api';
import { definitions } from '../../data/definitions';
import ToolTipIcon from '../../utils/ToolTipIcon';
import { getAuth } from '../../utils/auth-provider';
import { Exercise } from './Exercise';
import SubmitForm, { SubmitFormProps } from './SubmitForm';

interface WeekProps {
    week: IEngineWorkoutDay[];
}

const Week = (props: WeekProps) => {

    const { week } = props;

    const { _id } = getAuth()
    const navigation = useNavigate();
      const {data: logs, isLoading } = useFetchUserWorkoutLogs(_id);

    const windowSize = window.innerWidth;
    const mobile = windowSize < 650;
    const fontSize = mobile ? 'small' : 'medium';


    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState<SubmitFormProps['initialValues'] | null>(null);


    return (
        <>
            {week.map((day, i) => {
                const def = definitions.find(def => day.type.includes(def.type))?.description;
                const totalWork = day.workout.reduce((acc, curr) => acc + curr.totalWork, 0) / 60
                const log = logs?.find(log => log.workout === day._id)

                return (
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
                                {log && `Score: ${log.score / totalWork }`}
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
                                    <ToolTipIcon icon={<BarChart fontSize={fontSize}/>} text={'Leaderboard'} onClick={() => navigation('/leaderboard')} />
                                    <ToolTipIcon icon={<History fontSize={fontSize} />} text={'History'} onClick={() => navigation('/results')} />
                                    <ToolTipIcon
                                        icon={<Edit fontSize={fontSize} />}
                                        text={'Submit / Edit'}
                                        onClick={() => {
                                            setOpen(true);
                                             setInitialValues({
                                                 user_id: _id,
                                                 workout: day,
                                                 log
                                            });
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                );
            })}

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
                <DialogContent>
                    <SubmitForm
                        initialValues={initialValues as any}
                        closeDialog={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Week;
