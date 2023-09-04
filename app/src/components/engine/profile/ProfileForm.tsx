import {
    Button,
    Divider,
    Stack,
    TextField
} from '@mui/material';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { IUser } from '../../../../../types';
import { useUpdateUser } from '../../../api';
import DropdownSelect from '../../../utils/DropdownSelect';

export interface ProfileFormProps {
  initialValues: {
    user: IUser
  };
  closeDialog: () => void;
}
export enum EUserGender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_SPECIFIED = 'not specified',
}

export const GENDERS = Object.values(EUserGender);

const ProfileForm = ({ initialValues, closeDialog }: ProfileFormProps) => {
    const {
        user
    } = initialValues;

    const { mutate: updateUser } = useUpdateUser();

    const onSubmit = (values: any) => {
        updateUser({
            profile: {
                ...values
            },
            _id: user._id
        });
        closeDialog();
    };


    return (
        <Form
            initialValues={user}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
                <div>
                    <Divider textAlign='center' style={{ textTransform: 'capitalize' }}>
                        Edit Profile
                    </Divider>

                    <Field name='first_name'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='First Name'
                                margin='normal'
                                fullWidth
                            />
                        )}
                    </Field>

                    <Field name='last_name'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Last Name'
                                margin='normal'
                                fullWidth
                            />
                        )}
                    </Field>

                    {/* <Box
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
                        <Typography sx={{ pl: 2 }}>Email: {user.email}</Typography>
                    </Box> */}

                    <Field name='height'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Height'
                                margin='normal'
                                fullWidth
                            />
                        )}
                    </Field>

                    <Field name='weight'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Weight'
                                margin='normal'
                                fullWidth
                            />
                        )}
                    </Field>

                    <DropdownSelect
                        arrayItems={GENDERS}
                        field='gender'
                        label='Gender'
                        md={4}
                    />

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


export default ProfileForm;
