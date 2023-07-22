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
import Day from './Day';

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
                const log = logs?.find(log => log.workout === day._id)

                return (
                    <Day
                        key={day._id}
                        day={day}
                        setInitialValues={setInitialValues}
                        setOpen={setOpen}
                        user_id={_id}
                        log={log}
                    />
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
