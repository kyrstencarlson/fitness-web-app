import { Paper } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { startCase } from 'lodash';
import * as React from 'react';
import { IEngineWorkoutLogFormatted } from '../../../../types';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1
    },
    {
        field: 'day',
        headerName: 'Day',
        flex: 1
    },
    {
        headerAlign: 'left',
        align: 'left',
        field: 'score',
        headerName: 'Score',
        type: 'number',
        flex: 1
    },
    {
        field: 'modality',
        headerName: 'Modality',
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => startCase(params.value as string)
    },
    {
        field: 'units',
        headerName: 'Units',
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => startCase(params.value as string)
    }
];

const LeaderboardTable = (props: { logs: IEngineWorkoutLogFormatted[] }) => {
    const { logs } = props;


    return (
        <Paper>
            <DataGrid
                getRowId={row => row._id}
                rows={logs}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 50
                        }
                    }
                }}
                sx={{ p: 1 }}
                pageSizeOptions={[25, 50, 75, 100]}
            />
        </Paper>
    );
};

export default LeaderboardTable;
