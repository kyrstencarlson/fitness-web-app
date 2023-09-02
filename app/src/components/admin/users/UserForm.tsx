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
import { IUser } from '../../../../../types';
import { useUpdateUser } from '../../../api';
import DropdownSelect from '../../../utils/DropdownSelect';

export interface ProfileFormProps {
user: IUser | null;
  closeDialog: () => void;
}


const AdminUserForm = ({ user, closeDialog }: ProfileFormProps) => {
    const { mutate: updateUser } = useUpdateUser();


    if (!user) {
        closeDialog();
    }

    const onSubmit = (values: any) => {
        user && updateUser({
            _id: user._id,
            currentMonth: +values.currentMonth,
            roles: values.roles
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
                        Edit User
                    </Divider>

                    <Grid container pb={2} pt={2}>

                        <Grid item xs={12} md={6}>
                            <Typography sx={{ pl: 2 }}>Name: {user?.profile?.first_name} {user?.profile?.last_name}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography sx={{ pl: 2 }}>Email: {user?.email}</Typography>
                        </Grid>
                    </Grid>


                    <Field name='currentMonth'>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                helperText={meta.error && meta.touched ? meta.error : null}
                                label='Current Month'
                                margin='normal'
                                fullWidth
                            />
                        )}
                    </Field>

                    <DropdownSelect
                        arrayItems={['admin', 'engine', 'skills', 'strength']}
                        field='roles'
                        label='Roles'
                        multiple
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


export default AdminUserForm;
