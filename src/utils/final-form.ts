export type FinalFormErrors<T> = {
    [Property in keyof T]?: string
}

/**
 * simple util to reduce the amount of if statements within final forms validate functions
 * @param values final form 'values' object from the validate function
 * @param errors errors object that you return in validate function
 * @param fields the required fields on a form
 */
export const requiredFields = <T>(values: Partial<T>, errors: FinalFormErrors<T>, fields: Array<keyof T>) => {

    fields.forEach(field => {

        if (!values[field]) {

            errors[field] = 'Required';
        }

    });
};
