import { BarChart, Edit, ExpandMore, History, InfoOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { definitions } from '../../data/definitions';
import ToolTipIcon from '../../utils/ToolTipIcon';
import { getWeeksFromMonth } from '../../utils/formatDays';
import { Exercise } from './Exercise';
import SubmitForm, { SubmitFormProps } from './SubmitForm';
import { useFetchMonth } from '../../api';
import { getAuth } from '../../utils/auth-provider';

const Day = () => {

    // const {_id } = getAuth()

    // const navigation = useNavigate();
    // const { pathname } = useLocation();
    // const [, , , m, w] = pathname.split('/');

    // const { data: weeks, isLoading } = useFetchMonth(+m);
    // const week = weeks?.[+w];

    // const windowSize = window.innerWidth;
    // const mobile = windowSize < 650;
    // const fontSize = mobile ? 'small' : 'medium';

    // const [open, setOpen] = React.useState(false);
    // const [initialValues, setInitialValues] = React.useState<SubmitFormProps['initialValues'] | null>(null);

    // if (!week || isLoading) {
    //     return <CircularProgress />;
    // }

    // window.alert('user id'+ _id)

    // return (
    //     <>
    //         {week.map((days, i) => {

    //             const def = definitions.find(def => def.type === days.type)?.description;

    //             return (
    //                 <Accordion key={`${m}-${w}-${i}`} sx={{ alignContent: 'center' }}>
    //                     <AccordionSummary
    //                         expandIcon={<ExpandMore />}
    //                         aria-controls='panel1a-content'
    //                         id='panel1a-header'
    //                     >
    //                         <Typography
    //                             sx={{
    //                                 width: '15%',
    //                                 flexShrink: 0,
    //                                 alignSelf: 'center'
    //                             }}
    //                         >
    //                             Day {days.day}
    //                         </Typography>

    //                         <Typography color={'text.secondary'} textTransform={'capitalize'}
    //                             sx={{
    //                                 width: '70%',
    //                                 alignSelf: 'center'
    //                             }}>
    //                             {days.type}
    //                         </Typography>

    //                         <Typography color={'text.secondary'} sx={{
    //                             width: '10%',
    //                             alignSelf: 'center'
    //                         }}>
    //                             {/* {days.completed ? `Completed Pace: ${pace}` : null} */}
    //                         </Typography>

    //                         <ToolTipIcon
    //                             text={def as string}
    //                             icon={<InfoOutlined sx={{ height: '20px' }} />}
    //                             placement='bottom-start'
    //                         />
    //                     </AccordionSummary>

    //                     <AccordionDetails>
    //                         <Grid container>
    //                             <Grid item xs={9.5}>
    //                                 <Exercise workouts={days.workout} />
    //                             </Grid>

    //                             <Grid item xs={2.5} textAlign={'right'}>
    //                                 <ToolTipIcon icon={<BarChart fontSize={fontSize}/>} text={'Leaderboard'} onClick={() => navigation('/leaderboard')} />
    //                                 <ToolTipIcon icon={<History fontSize={fontSize} />} text={'History'} onClick={() => navigation('/results')} />
    //                                 <ToolTipIcon
    //                                     icon={<Edit fontSize={fontSize} />}
    //                                     text={'Submit / Edit'}
    //                                     onClick={() => {
    //                                         setOpen(true);
    //                                         setInitialValues({
    //                                             workout: days._id,
    //                                             user_id: _id,
    //                                             day: i + 1,
    //                                             week: +w,
    //                                             month: +m,
    //                                             totalWork: days.workout.reduce((acc, curr) => acc + curr.totalWork, 0),
    //                                         });
    //                                     }}
    //                                 />
    //                             </Grid>
    //                         </Grid>
    //                     </AccordionDetails>
    //                 </Accordion>
    //             );
    //         })}

    //         <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
    //             <DialogContent>
    //                 <SubmitForm
    //                     initialValues={initialValues as any}
    //                     closeDialog={() => setOpen(false)}
    //                 />
    //             </DialogContent>
    //         </Dialog>
    //     </>
    // );
};

export default Day;
