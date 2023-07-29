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
import { IAuthParamsRegister, IEngineWorkoutDay, IEngineWorkoutLog, IEngineWorkoutLogBase, IUser, IUserParamsCreate } from '../../../../types';
import { useCreateWorkoutLog, useDeleteWorkoutLog, useFindWorkoutLog, useUpdateWorkoutLog } from '../../api';
import DropdownSelect from '../../utils/DropdownSelect';
import { FinalFormErrors, requiredFields } from '../../utils/final-form';
import { confirmationPrompt } from '../../utils/confirmationPrompt';
import { useRegisterUser } from '../../api/auth';


const SignUpForm = () => {

    const { mutate: register } = useRegisterUser();


    // React.useEffect(() => {
    //     if (log) {
    //         setPace(log.score / totalWork);
    //     }
    // }, [log, totalWork]);


    const onSubmit = (values: any) => {

        const createParams: IAuthParamsRegister = {
            password: 'password',
            email: 'email',
            confirmPassword: 'confirmPassword',
            firstName: 'firstName',
            lastName: 'lastName'

        };
        register(createParams);

    };

    return (
        <Form
            initialValues={null}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
                <div>

                    <Field name='firstName'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='First Name'
                                margin='normal'
                            />
                        )}
                    </Field>

                    <Field name='lastName'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Last Name'
                                margin='normal'
                            />
                        )}
                    </Field>

                    <Field name='email'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Email'
                                fullWidth
                                margin='normal'
                            />
                        )}
                    </Field>


                    <Field name='password'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Password'
                                fullWidth
                                margin='normal'
                            />
                        )}
                    </Field>


                    <Field name='confirmPassword'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Confirm Password'
                                fullWidth
                                margin='normal'
                            />
                        )}
                    </Field>

                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{ mt: 2 }}
                        style={{ float: 'right' }}
                    >
                        <Button onClick={handleSubmit} disabled={pristine || submitting}>
                            Submit
                        </Button>
                    </Stack>
                </div>
            )}
        />
    );
};

const validate = (values: IUser & { confirmPassword: string }) => {
    const errors: FinalFormErrors<IUser & { confirmPassword: string }> = {};

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    const email_reg = String(values.email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (email_reg === null) {
        errors.email = 'Invalid email address';
    }

    // if (email_reg.test(values.email) === false) {
    //     errors.email = 'Invalid email address';
    // }

    requiredFields<IUser & { confirmPassword: string }>(values, errors, [
        'email',
        'password',
        'confirmPassword'
    ]);

    return errors;
};

export default SignUpForm;
