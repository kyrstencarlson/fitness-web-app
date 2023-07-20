import { Delete } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Field, Form } from 'react-final-form';
import DropdownSelect from '../../utils/DropdownSelect';
import { FinalFormErrors, requiredFields } from '../../utils/final-form';
import { toast } from '../../utils/alerts';
import { EWorkoutLogModality, EWorkoutLogUnits } from '../../../../types';

interface Day {
    month: number;
    week: number;
    day: number;
    type: string;
    score: number;
    units: string;
    modality: string;
    notes?: string;
}


interface FormProps {
    initialValues: {
        entries?: any;
        month: number;
        week: number;
        day: number;
        totalWork: number;
    };
    closeDialog: () => void;
}

const units = Object.values(EWorkoutLogUnits)
const modality = Object.values(EWorkoutLogModality)

const SubmitForm = ({ initialValues, closeDialog }: FormProps) => {

    const {
        month, week, day, entries, totalWork
    } = initialValues;

    const [pace, setPace] = React.useState<any>(null);


    const onSubmit = (values: any) => {
        console.log(values);
        toast({ title: 'Workout Submitted' });
        closeDialog();
    };

    return (
        <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
                <div>

                    {entries &&
                        <Grid textAlign={'right'} mb={0.5}>
                            <Button
                                onClick={closeDialog}
                                variant='outlined'
                                color='error'
                                startIcon={<Delete />}
                            >
                                Delete
                            </Button>
                        </Grid>
                    }

                    <Divider textAlign='center' style={{ textTransform: 'capitalize' }}>
                        {entries ? 'Edit' : 'Submit'}
                    </Divider>

                    <Typography variant='body2' display='block' align='center' mt={0.5}>
                        Month {month} Week {week} Day {day}
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

                    <Box style={{
                        display: 'flex',
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderStyle: 'solid',
                        borderRadius: '4px',
                        height: '55px',
                        alignItems: 'center',
                        marginTop: '3px',
                        marginBottom: '5px'
                    }}>
                        <Typography sx={{ pl: 2 }}>Pace: {pace / totalWork}</Typography>
                    </Box>

                    <DropdownSelect
                        field='units'
                        label='Units'
                        arrayItems={units}
                        required
                        md={12}
                    />

                    <DropdownSelect
                        field='modality'
                        label='Modality'
                        arrayItems={modality}
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
                        <Button variant='outlined' onClick={closeDialog}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={pristine || submitting}>
                            Submit
                        </Button>
                    </Stack>
                </div>
            )}
        />
    );
};

const validate = (values: Day) => {

    const errors: FinalFormErrors<Day> = {};

    requiredFields<Day>(
        values,
        errors,
        [
            'score',
            'units',
            'modality'
        ]
    );

    return errors;
};


export default SubmitForm;
