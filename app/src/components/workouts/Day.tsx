import { BarChart, ChatRounded, Edit, EmojiEvents, ExpandMore, History, InfoOutlined, Menu } from '@mui/icons-material';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Tooltip, IconButton, Box, Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { month } from './Month';
import ToolTipIcon from '../../utils/ToolTipIcon';
import SubmitForm from './SubmitForm';
import { definitions } from '../../data/definitions';

const Day = () => {

    const navigation = useNavigate();
    const { pathname } = useLocation();
    const [, path, m, w, d] = pathname.split('/');
    const week = month[(+m - 1)];

    const windowSize = window.innerWidth;

    const mobile = windowSize < 650;
    const fontSize = mobile ? 'small' : 'medium';

    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState<any>(null);

    return (
        <>
            {week.map((days, i) => {

                const def = definitions.find(def => def.name === days.type)?.text;

                return (
                    <Accordion key={`${m}-${w}-${i}`} sx={{ alignContent: 'center' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                        >
                            <Typography sx={{
                                width: '15%',
                                flexShrink: 0,
                                alignSelf: 'center'
                            }}>
                            Day {i + 1}
                            </Typography>

                            <Typography color={'text.secondary'} sx={{
                                width: '70%',
                                alignSelf: 'center'
                            }}>
                                {days.type}
                            </Typography>

                            <Typography color={'text.secondary'} sx={{
                                width: '10%',
                                alignSelf: 'center'
                            }}>
                                {i === 0 ? 'Pace' : ''}
                            </Typography>

                            <ToolTipIcon
                                text={def as string}
                                icon={<InfoOutlined sx={{ height: '20px' }} />}
                                placement='bottom-start'
                            />
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={mobile ? 6.5 : 9.5}>
                                    <Typography alignSelf={'center'}>Some type of work here: 10min race pace ...</Typography>
                                </Grid>

                                <Grid item xs={mobile ? 5.5 : 2.5} textAlign={'right'}>
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
