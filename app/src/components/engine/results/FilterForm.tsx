import {
    Button,
    Grid,
    Typography
} from '@mui/material';
import { max, min, range, uniq } from 'lodash';
import React from 'react';
import { Form } from 'react-final-form';
import { IEngineWorkoutLog } from '../../../../../types';
import DropdownSelect from '../../../utils/DropdownSelect';
import { MODALITY, UNITS, WORKOUT_TYPE } from '../workouts/SubmitForm';

interface FilterFormProps {
    filtered: any;
    setFiltered: (filtered: any) => void;
    logs: IEngineWorkoutLog[]
}

const FilterForm = (props: FilterFormProps) => {
    const { filtered, setFiltered, logs } = props;

    const months = uniq(logs.map((log: any) => log.workout_month));

    const showMonthsOptions = max(months) !== min(months);


    const onSubmit = (values: any) => {
        const {
            units, modality, workout_type,
            workout_month_from = 0, workout_month_to = 100
        } = values;
        const filter = filtered.filter((log: any) => {
            if (units && units !== log.units) {
                return false;
            }
            if (modality && modality !== log.modality) {
                return false;
            }
            if (workout_type && !workout_type.includes(log.workout_type)) {
                return false;
            }

            const from = +workout_month_from * 20;
            const to = +workout_month_to * 20;

            const dayArray = range(from, to);

            if (!dayArray.includes(log.workout_month)) {
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
                        <DropdownSelect
                            field='workout_type'
                            label='Day Type'
                            arrayItems={WORKOUT_TYPE}
                            multiple
                            onChange={() => handleSubmit()}
                            md={12}
                        />
                        <DropdownSelect
                            field='modality'
                            label='Modality'
                            arrayItems={MODALITY}
                            onChange={() => handleSubmit()}
                        />
                        <DropdownSelect
                            field='units'
                            label='Units'
                            arrayItems={UNITS}
                        />


                        {showMonthsOptions &&
                        <>
                            <DropdownSelect
                                field='workout_month'
                                label='Month From'
                                arrayItems={months}
                                onChange={() => handleSubmit()}
                            />

                            <DropdownSelect
                                field='workout.day'
                                label='Month To'
                                arrayItems={months}
                                onChange={() => handleSubmit()}
                            />
                        </>
                        }
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
