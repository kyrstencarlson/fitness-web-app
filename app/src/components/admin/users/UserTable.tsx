import { Dialog, DialogContent, Paper } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import * as React from 'react';
import { IUser } from '../../../../../types';
import QuickFilterGrid from '../../../utils/DataGrid';
import AdminUserForm from './UserForm';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1
    },
    {
        field: 'roles',
        headerName: 'Roles',
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => params.value.join(', ')
    },
    {
        field: 'engine_current_month',
        headerName: 'Engine Month Index',
        flex: 1
    },
    {
        field: 'skills_current_month',
        headerName: 'Skills Month Index',
        flex: 1
    },
    {
        field: 'strength_current_month',
        headerName: 'Strength Month Index',
        flex: 1
    }
];

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const UsersTable = (props: { users: IUser[] }) => {
    const { users } = props;

    const [edit, setEdit] = React.useState(false);
    const [user, setUser] = React.useState<IUser | null>(null);

    return (
        <>
            <Paper>
                <QuickFilterGrid
                    rows={users}
                    columns={columns}
                    key={'_id'}
                    onRowDoubleClick={e => { setUser(e.row) ; setEdit(true); }}
                    searchFields={['name', 'email']}
                />

            </Paper>

            <Dialog open={edit} onClose={() => setEdit(false)} fullWidth maxWidth='sm'>
                <DialogContent>
                    <AdminUserForm
                        user={user as IUser}
                        closeDialog={() => setEdit(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UsersTable;
