import { BarChart, ChatRounded, Edit, EmojiEvents, ExpandMore, History, InfoOutlined, Menu } from '@mui/icons-material';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Tooltip, IconButton, Box, Dialog, DialogContent, Divider } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToolTipIcon from '../../utils/ToolTipIcon';
import SubmitForm from './SubmitForm';
import { definitions } from '../../data/definitions';
import { convertTime } from '../../utils/convertTime';
import pluralize from 'pluralize';
import { months } from './Month';
import { getWeeksFromMonth } from '../../utils/getWeeksFromMonth';
import { Exercise } from './Exercise';

const Day = () => {

    const navigation = useNavigate();
    const { pathname } = useLocation();
    const [, , m, w] = pathname.split('/');
    const month = months[+m - 1];
    const week = getWeeksFromMonth(month)[+w - 1];

    const windowSize = window.innerWidth;
    const mobile = windowSize < 650;
    const fontSize = mobile ? 'small' : 'medium';


    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState<any>(null);

    return (
        <>
            {week.map((days, i) => {

                const def = definitions.find(def => def.type === days.type)?.text;

                return (
                    <Accordion key={`${m}-${w}-${i}`} sx={{ alignContent: 'center' }}>
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
                                Day {days.day}
                            </Typography>

                            <Typography color={'text.secondary'} textTransform={'capitalize'}
                                sx={{
                                    width: '70%',
                                    alignSelf: 'center'
                                }}>
                                {days.type}
                            </Typography>

                            <Typography color={'text.secondary'} sx={{
                                width: '10%',
                                alignSelf: 'center'
                            }}>
                                {/* {days.completed ? `Completed Pace: ${pace}` : null} */}
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
                                    <Exercise workouts={days.workout} />
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
                                                day: i + 1,
                                                week: +w,
                                                month: +m,
                                                entires: ''
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
                        initialValues={initialValues}
                        closeDialog={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Day;
