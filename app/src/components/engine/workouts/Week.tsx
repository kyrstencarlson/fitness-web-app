import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import WorkoutTimer from '../timer/WorkoutTimer';
import Day from './Day';
import SubmitForm, { SubmitFormProps } from './SubmitForm';
import { IEngineWorkoutDay } from '../../../../../types';
import { useFetchUserWorkoutLogs } from '../../../api';
import { getAuth } from '../../../utils/auth-provider';

interface WeekProps {
    week: IEngineWorkoutDay[];
}

const Week = (props: WeekProps) => {

    const { week } = props;

    const { _id } = getAuth();
    const { data: logs, isLoading } = useFetchUserWorkoutLogs(_id);

    const windowSize = window.innerWidth;
    const mobile = windowSize < 650;
    const fontSize = mobile ? 'small' : 'medium';


    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState<SubmitFormProps['initialValues'] | null>(null);

    const [timerOpen, setTimerOpen] = React.useState(false);
    const [workouts, setWorkouts] = React.useState<null | IEngineWorkoutDay['workout']>(null);
    const [formOpen, setFormOpen] = React.useState(false);

    return (
        <>
            {week.map((day, i) => {
                const log = logs?.find(log => log.workout._id === day._id);

                return (
                    <Day
                        key={day._id}
                        day={day}
                        timerOpen={timerOpen}
                        setWorkouts={setWorkouts}
                        setInitialValues={setInitialValues}
                        setOpen={setFormOpen}
                        setTimerOpen={setTimerOpen}
                        user_id={_id}
                        log={log}
                    />
                );
            })}

            <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth='md'>
                <DialogContent>
                    <SubmitForm
                        initialValues={initialValues as any}
                        closeDialog={() => setFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={timerOpen} onClose={() => setTimerOpen(false)} fullWidth maxWidth='md'>
                <DialogContent>
                    <WorkoutTimer workouts={workouts as any} closeDialog={() => setTimerOpen(false)}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Week;
