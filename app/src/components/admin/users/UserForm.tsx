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
import { useUpdateUser } from '../../../api';
import DropdownSelect from '../../../utils/DropdownSelect';


export interface ProfileFormProps {
    user: any;
    closeDialog: () => void;
}


const AdminUserForm = ({ user, closeDialog }: ProfileFormProps) => {

    const { mutate: updateUser } = useUpdateUser();

    if (!user) {
        closeDialog();
    }

    const [roles, setRoles] = React.useState(user.roles);

    const onSubmit = (values: any) => {

        const update: any = {
            _id: user!._id,
            roles: values.roles
        };

        if (values.roles.includes('engine')) {
            update.engine_current_month = +values.engine_current_month;
        }
        if (values.roles.includes('skills')) {
            update.skills_current_month = +values.skills_current_month;
        }
        if (values.roles.includes('strength')) {
            update.strength_current_month = +values.strength_current_month;
        }

        user && updateUser(update);
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

                    <DropdownSelect
                        arrayItems={['admin', 'engine', 'skills', 'strength']}
                        field='roles'
                        label='Roles'
                        multiple
                        md={4}
                        onChange={e => setRoles(e.target.value)}
                    />


                    {roles.includes('engine') &&
                        <Field name='engine_current_month'>
                            {({ input, meta }) => (
                                <TextField
                                    {...input}
                                    error={meta.error && meta.touched}
                                    helperText={meta.error && meta.touched ? meta.error : null}
                                    label='Engine Current Month'
                                    margin='normal'
                                    fullWidth
                                />
                            )}
                        </Field>
                    }

                    {roles.includes('skills') &&
                        <Field name='skills_current_month'>
                            {({ input, meta }) => (
                                <TextField
                                    {...input}
                                    error={meta.error && meta.touched}
                                    helperText={meta.error && meta.touched ? meta.error : null}
                                    label='Skills Current Month'
                                    margin='normal'
                                    fullWidth
                                />
                            )}
                        </Field>
                    }

                    {roles.includes('strength') &&
                        <Field name='strength_current_month'>
                            {({ input, meta }) => (
                                <TextField
                                    {...input}
                                    error={meta.error && meta.touched}
                                    helperText={meta.error && meta.touched ? meta.error : null}
                                    label='Strength Current Month'
                                    margin='normal'
                                    fullWidth
                                />
                            )}
                        </Field>
                    }

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
