import { Form, Field } from 'react-final-form';
import { TextField, Divider, Stack, Button, Typography, Box, Grid, IconButton } from '@mui/material';
import React from 'react';
import DropdownSelect from '../../utils/DropdownSelect';
import { FinalFormErrors, requiredFields } from '../../utils/final-form';
import { Delete } from '@mui/icons-material';

interface Day {
    month: number;
    week: number;
    day: number;
    type: string;
    score: number;
    units: string;
    modality: string;
    location: string;
    time: string;
    rating: number;
    readiness: number;
    sleep: number;
    notes?: string;
}


interface FormProps {
    initialValues: {
        entries?: any;
        month: number;
        week: number;
        day: number;
    };
    closeDialog: () => void;
}

const units = ['meters', 'calories', 'watts', 'kilometers', 'miles', 'reps'];
const modality = ['bike erg', 'rowing', 'assault bike', 'echo bike', 'other bike', 'ski erg', 'run (treadmill)', 'run', 'metcon'];
const location = ['home gyn', 'gym / box', 'travel gym', 'hotel gym'];
const time = ['1st thing', 'morning', 'afternoon', 'evening'];
const rating = [
    {
        value: 1,
        label: '1/5 - Poor'
    },
    {
        value: 2,
        label: '2/5 - Fair'
    },
    {
        value: 3,
        label: '3/5 - Average'
    },
    {
        value: 4,
        label: '4/5 - Good'
    },
    {
        value: 5,
        label: '5/5 - Excellent'
    }
];

const SubmitForm = ({ initialValues, closeDialog }: FormProps) => {

    const {
        month, week, day, entries
    } = initialValues;

    const [pace, setPace] = React.useState<any>(null);


    const onSubmit = (values: any) => {
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
                        <Typography sx={{ pl: 2 }}>Pace: {pace / 10}</Typography>
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

                    <DropdownSelect
                        field='location'
                        label='Location'
                        arrayItems={location}
                        md={12}
                    />

                    <DropdownSelect
                        field='time'
                        label='Time'
                        arrayItems={time}
                        md={12}
                    />

                    <DropdownSelect
                        field='readiness'
                        label='How I Feel'
                        arrayItems={rating}
                        itemKey='value'
                        itemLabel='label'
                        itemValue='label'
                        md={12}
                    />

                    <DropdownSelect
                        field='sleep'
                        label='How I Slept'
                        arrayItems={rating}
                        itemKey='value'
                        itemLabel='label'
                        itemValue='label'
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
