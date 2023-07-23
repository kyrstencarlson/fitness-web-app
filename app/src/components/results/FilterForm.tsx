import {
    Button,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import React from 'react';
import { Form } from 'react-final-form';
import DropdownSelect from '../../utils/DropdownSelect';
import { MODALITY, WORKOUT_TYPE } from '../workouts/SubmitForm';
import { useFetchUserWorkoutLogs } from '../../api';
import { useAuth } from '../../utils/AuthContext';

interface FilterFormProps {
    filtered: any;
    setFiltered: (filtered: any) => void;
}

const FilterForm = (props: FilterFormProps) => {
    const { filtered, setFiltered } = props;


    const onSubmit = (values: any) => {
        const {
            modality, workout_type, workout_month_from = 0, workout_month_to = 100
        } = values;
        const filter = filtered.filter((log: any) => {
            if (modality && modality !== log.modality) {
                return false;
            }

            if (workout_type && !workout_type.includes(log.workout_type)) {
                return false;
            }

            //todo
            if (![workout_month_from, workout_month_to].includes(log.workout_month)) {
                return false;
            }

            return true;
        });

        setFiltered(filter);
    };


    return (
        <Form
            initialValues={null}
            onSubmit={onSubmit}
            // validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
                <div>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item xs={11}>
                            <Typography variant='h6' gutterBottom>
                                Filter
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={handleSubmit} disabled={pristine || submitting} sx={{
                                display: (pristine || submitting) ? 'none' : 'block'
                            }}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        {/* <DropdownSelect
                            field='units'
                            label='Units'
                            arrayItems={UNITS}
                        /> */}

                        <DropdownSelect
                            field='modality'
                            label='Modality'
                            arrayItems={MODALITY}
                            onChange={() => handleSubmit()}
                        />

                        <DropdownSelect
                            field='workout_type'
                            label='Day Type'
                            arrayItems={WORKOUT_TYPE}
                            multiple
                            onChange={() => handleSubmit()}
                        />

                        <DropdownSelect
                            field='workout_month'
                            label='Month From'
                            arrayItems={Array.from(Array(12).keys()).map(i => i + 1)}
                            onChange={() => handleSubmit()}
                        />

                        <DropdownSelect
                            field='workout_month'
                            label='Month To'
                            arrayItems={Array.from(Array(12).keys()).map(i => i + 1)}
                            onChange={() => handleSubmit()}
                        />
                    </Grid>

                </div>
            )}
        />
    );
};

// const validate = (values: IEngineWorkoutLog) => {
//     const errors: FinalFormErrors<IEngineWorkoutLog> = {};

//     requiredFields<IEngineWorkoutLog>(values, errors, [
//         'units',
//         'modality'
//     ]);

//     return errors;
// };

export default FilterForm;
