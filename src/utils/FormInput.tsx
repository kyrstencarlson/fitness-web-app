import { Field } from 'react-final-form';
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

interface FormInputProps {
    name: string;
    label: string;
    restProps?: TextFieldProps;
    id?: string;
    maxLength?: number;
}

const FormInput = (props: FormInputProps) => {
    const {
        name, label, restProps, maxLength = 255
    } = props;
    const { id = `${name}-input` } = props;

    const isTooLong = (length: number) => (maxLength ? length > maxLength : false);

    return (
        <Field
            name={name}
            render={({ input, meta }) => (
                <TextField
                    {...input}
                    id={id}
                    label={label}
                    fullWidth
                    margin='normal'
                    error={!!meta.error && !!meta.touched || isTooLong(input.value.length)}
                    helperText={isTooLong(input.value.length)
                        ? `Must be ${maxLength} characters or less. Current: ${input.value.length}`
                        : meta.error && meta.touched
                            ? meta.error
                            : ''
                    }
                    InputLabelProps={{ htmlFor: id }}
                    {...restProps}
                />
            )}
        />
    );
};

export default FormInput;
