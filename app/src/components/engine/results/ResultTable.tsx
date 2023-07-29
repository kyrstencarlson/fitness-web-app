import { Paper } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { startCase } from 'lodash';
import * as React from 'react';
import { IEngineWorkoutLogFormatted } from '../../../../../types';

const columns: GridColDef[] = [
    {
        field: 'day',
        headerName: 'Day',
        width: 75
    },
    {
        headerAlign: 'left',
        align: 'left',
        field: 'score',
        headerName: 'Score',
        type: 'number',
        width: 150
    },
    {
        headerAlign: 'left',
        align: 'left',
        field: 'pace',
        headerName: 'Pace',
        type: 'number',
        width: 150
    },
    {
        field: 'modality',
        headerName: 'Modality',
        width: 150,
        valueGetter: (params: GridValueGetterParams) => startCase(params.value as string)
    },
    {
        field: 'units',
        headerName: 'Units',
        width: 150,
        valueGetter: (params: GridValueGetterParams) => startCase(params.value as string)
    },
    {
        field: 'notes',
        headerName: 'Notes',
        flex: 1
    }
];

const ResultTable = (props: { logs: IEngineWorkoutLogFormatted[] }) => {
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
                            pageSize: 20
                        }
                    }
                }}
                sx={{ p: 1 }}
                pageSizeOptions={[20, 40, 60]}
            />
        </Paper>
    );
};

export default ResultTable;
