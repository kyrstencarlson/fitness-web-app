import { Delete } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { IEngineWorkoutDay, IEngineWorkoutLog, IEngineWorkoutLogBase } from '../../../../types';
import { useCreateWorkoutLog, useDeleteWorkoutLog, useFindWorkoutLog, useUpdateWorkoutLog } from '../../api';
import DropdownSelect from '../../utils/DropdownSelect';
import { FinalFormErrors, requiredFields } from '../../utils/final-form';
import { confirmationPrompt } from '../../utils/confirmationPrompt';

export enum EWorkoutLogUnits {
  METERS = 'meters',
  REPS = 'reps',
  CALORIES = 'calories',
  WATTS = 'watts',
  KILOMETERS = 'kilometers',
  MILES = 'miles',
}

export enum EWorkoutLogModality {
  ROW = 'row',
  OTHER_BIKE = 'other bike',
  ASSAULT_BIKE = 'assault bike',
  ECHO_BIKE = 'echo bike',
  BIKE_ERG = 'bike erg',
  AIR_RUNNER = 'air runner',
  TREADMILL = 'treadmill',
  RUN = 'run',
  SKI = 'ski',
  SWIM = 'swim',
  OTHER = 'other',
}

export enum EWorkoutType {
  ENDURANCE = 'endurance',
  THRESHOLD = 'threshold',
  MAX_AEROBIC_POWER = 'max aerobic power',
  ANAEROBIC = 'anaerobic',
  INTERVAL = 'interval',
  TIME_TRIAL = 'time trial',
  POLARIZED = 'polarized',
  ROCKET_RACES = 'rocket races',
  FLUX = 'flux',
  HYBRID_BLOCK = 'hybrid block',
  FLUX_STAGES = 'flux stages',
  ASCENDING = 'ascending',
  DEVOUR = 'devour',
  INFINITY_BLOCK = 'infinity block',
  TOWERS_BLOCK = 'towers block',
  AFTERBURNERS_BLOCK = 'afterburners block',
  ATOMIC_BLOCK = 'atomic block',
  SYNTHESIS_BLOCK = 'synthesis block',
  ASCENDING_DEVOUR = 'ascending devour',
  DESCENDING_DEVOUR = 'descending devour',
}

export interface SubmitFormProps {
  initialValues: {
    user_id: string;
    workout: IEngineWorkoutDay;
    log?: IEngineWorkoutLogBase | undefined
  };
  closeDialog: () => void;
}

export const UNITS = Object.values(EWorkoutLogUnits);
export const MODALITY = Object.values(EWorkoutLogModality);
export const WORKOUT_TYPE = Object.values(EWorkoutType);

const SubmitForm = ({ initialValues, closeDialog }: SubmitFormProps) => {
    const {
        user_id,
        workout,
        log
    } = initialValues;

    const [pace, setPace] = React.useState<any>(null);

    const { mutate: createWorkoutLog } = useCreateWorkoutLog();
    const { mutate: updateWorkoutLog } = useUpdateWorkoutLog();
    const { mutate: deleteWorkoutLog } = useDeleteWorkoutLog();

    const totalWork = workout.workout.reduce((acc, curr) => acc + curr.totalWork, 0) / 60;

    React.useEffect(() => {
        if (log) {
            setPace(log.score / totalWork);
        }
    }, [log, totalWork]);


    const onSubmit = (values: any) => {

        if (log) {
            updateWorkoutLog({
                ...values,
                log_id: log._id,
                workout: workout._id,
                workout_month: workout.month,
                workout_type: workout.type,
                user_id
            });
        }
        else {
            const createParams = {
                ...values,
                workout: workout._id,
                workout_month: workout.month,
                workout_type: workout.type,
                user_id
            };
            createWorkoutLog(createParams);
        }

        closeDialog();
    };

    const deleteScore = () => {
        if (log) {
            confirmationPrompt({
                firstMessage: 'Are you sure you want to delete this score?',
                actionFunction: () => deleteWorkoutLog(log._id),
                closeDialog
            });
        }
    };


    return (
        <Form
            initialValues={log}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
                <div>
                    {log && (
                        <Grid textAlign={'right'} mb={0.5}>
                            <Button
                                onClick={deleteScore}
                                variant='outlined'
                                color='error'
                                startIcon={<Delete />}
                            >
                              Delete
                            </Button>
                        </Grid>
                    )}

                    <Divider textAlign='center' style={{ textTransform: 'capitalize' }}>
                        {log ? 'Edit' : 'Submit'}
                    </Divider>

                    <Typography variant='body2' display='block' align='center' mt={0.5}>
                        Month {workout.month} Week {workout.week} Day {workout.day}
                    </Typography>

                    <Field name='score'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Score'
                                fullWidth
                                margin='normal'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    input.onChange(e.target.value);
                                    setPace(e.target.value);
                                }}
                            />
                        )}
                    </Field>

                    <Box
                        style={{
                            display: 'flex',
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderStyle: 'solid',
                            borderRadius: '4px',
                            height: '55px',
                            alignItems: 'center',
                            marginTop: '3px',
                            marginBottom: '5px'
                        }}
                    >
                        <Typography sx={{ pl: 2 }}>Pace: {pace / totalWork}</Typography>
                    </Box>

                    <DropdownSelect
                        field='units'
                        label='Units'
                        arrayItems={UNITS}
                        required
                        md={12}
                    />

                    <DropdownSelect
                        field='modality'
                        label='Modality'
                        arrayItems={MODALITY}
                        required
                        md={12}
                    />

                    <Field name='notes'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Notes'
                                fullWidth
                                margin='normal'
                                multiline
                            />
                        )}
                    </Field>

                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ mt: 2 }}
                        style={{ float: 'right' }}
                    >
                        <Button variant='outlined' onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={pristine || submitting}>
                            Submit
                        </Button>
                    </Stack>
                </div>
            )}
        />
    );
};

const validate = (values: IEngineWorkoutLog) => {
    const errors: FinalFormErrors<IEngineWorkoutLog> = {};

    requiredFields<IEngineWorkoutLog>(values, errors, [
        'score',
        'units',
        'modality'
    ]);

    return errors;
};

export default SubmitForm;
