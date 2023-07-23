import { Field } from 'react-final-form';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material';
import React from 'react';

interface DropdownSelectProps {
    field: string;
    label: string;
    arrayItems: any[];
    // ex. if you want to use programs.id as key pass 'id' as itemKey
    itemKey?: string;
    // ex. if you want to use programs.name as value pass 'name' as itemValue
    itemValue?: string;
    // ex. if you want to use programs.name as label pass 'name' as itemLabel
    itemLabel?: string;
    required?: boolean;
    multiple?: boolean;
    margin?: 'none' | 'dense' | 'normal';
    maxWidth?: string;
    width?: string;
    xs?: number;
    md?: number;
    sx?: SxProps<Theme>;
    formStyle?: SxProps<Theme>;
    selectStyle?: SxProps<Theme>;
    initialValue?: any;
    renderValue?: (value: any) => React.ReactNode;
    onChange?: (event: SelectChangeEvent<any>) => void;
}

const DropdownSelect = React.forwardRef((props: DropdownSelectProps, ref) => {
    const {
        arrayItems, field, label, xs = 12, md, itemKey, itemValue, itemLabel,
        margin = 'dense', required = true, multiple = false, initialValue,
        sx, formStyle, selectStyle,
        renderValue, onChange
    } = props;

    return (
        <Grid item xs={xs} md={md ?? xs / 2} sx={sx}>
            <Field name={field}>
                {({ input, meta }) => (
                    <FormControl margin={margin} fullWidth error={required && (meta.touched && !!meta.error)} sx={{
                        ...formStyle,
                        textAlign: 'left'
                    }}>
                        <InputLabel htmlFor={`${field}-select`} style={{ textTransform: 'capitalize' }}>{label}</InputLabel>
                        <Select
                            {...input}
                            ref={ref}
                            id={`${field}-select`}
                            label={label}
                            value={input.value || initialValue || (multiple ? [] : '')}
                            multiple={multiple}
                            renderValue={renderValue}
                            sx={selectStyle}
                            onChange={(event: SelectChangeEvent<any>) => {
                                input.onChange(event.target.value);
                                onChange && onChange(event);
                            }}
                        >
                            {arrayItems.map(item => (
                                <MenuItem key={itemKey ? item?.[itemKey] : item} value={itemValue ? item?.[itemValue] : item} sx={{ textTransform: 'capitalize' }}>
                                    {itemLabel ? item?.[itemLabel] : item}
                                </MenuItem>
                            ))}
                        </Select>
                        {required && (meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>)}
                    </FormControl>
                )}
            </Field>
        </Grid>
    );
});

export default DropdownSelect;
