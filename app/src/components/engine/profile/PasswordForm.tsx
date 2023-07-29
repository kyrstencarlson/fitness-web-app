import {
    Button,
    Divider,
    Stack,
    TextField
} from '@mui/material';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { IUser } from '../../../../../types';
import { useResetPassword } from '../../../api/auth';

export interface ProfileFormProps {

    initialValues: {
        user: IUser
    };
  closeDialog: () => void;
}

const PasswordForm = ({ initialValues, closeDialog }: ProfileFormProps) => {
    const { user } = initialValues;
    const { mutate: resetPassword } = useResetPassword();

    const onSubmit = (values: any) => {
        resetPassword({
            user_id: user._id,
            password: values.password,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        });
        closeDialog();
    };


    return (
        <Form
            initialValues={null}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
                <div>
                    <Divider textAlign='center' style={{ textTransform: 'capitalize' }}>
                        Reset Password
                    </Divider>

                    <Field name='password'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Current Password'
                                margin='normal'
                                fullWidth
                            />
                        )}
                    </Field>

                    <Field name='newPassword'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='New Password'
                                margin='normal'
                                fullWidth
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
                                margin='normal'
                                fullWidth
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


export default PasswordForm;
