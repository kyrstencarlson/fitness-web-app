import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';


function escapeRegExp(value: string) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props: any) {
    return (
        <Box sx={{
            p: 0.5,
            pb: 0
        }} >
            <TextField
                variant='standard'
                value={props.value}
                onChange={props.onChange}
                placeholder='Search'
                InputProps={{
                    startAdornment: <SearchIcon fontSize='small' />,
                    endAdornment: (
                        <IconButton
                            title='Clear'
                            aria-label='Clear'
                            size='small'
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize='small' />
                        </IconButton>
                    )
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto'
                    },
                    m: theme => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.5
                    },
                    '& .MuiInput-underline:before': {
                        borderBottom: 1,
                        borderColor: 'divider'
                    }
                }}
            />
        </Box>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

interface Props {
    rows: Record<string, any>[];
    columns: GridColDef[];
    searchFields?: string[];
    onRowDoubleClick?: (event: any) => void;
    isLoading?: boolean;
}

const QuickFilterGrid = (props: Props) => {

    const {
        columns, rows, isLoading, searchFields, onRowDoubleClick
    } = props;

    const [searchText, setSearchText] = React.useState('');
    const [_rows, setRows] = React.useState(rows);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = rows.filter(row => {
            const fields = searchFields ? Object.keys(row).filter(field => searchFields.includes(field)) : Object.keys(row);

            return fields.some(field => searchRegex.test(row[field]?.toString()));
        });

        setRows(filteredRows);
    };

    React.useEffect(() => {
        setRows(rows);
    }, [rows]);

    return (
        <Box style={{
            padding: '15px',
            borderRadius: '5px'
        }}>
            <DataGrid
                style={{ border: 'none' }}
                slots={{ toolbar: QuickSearchToolbar }}
                rows={_rows}
                columns={columns}
                pagination
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 50
                        }
                    }
                }}
                getRowId={row => row._id}
                slotProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event: any) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch('')
                    }
                }}
                loading={isLoading || false}
                autoHeight
                onRowDoubleClick={onRowDoubleClick}
                getRowClassName={() => '.data-grid-row'}
                pageSizeOptions={[25, 50, 75, 100]}
            />
        </Box>
    );
};

export default QuickFilterGrid;
