export const emptyFieldValidator = (...fields) => {
    const errors = [];

    fields.forEach((field) => {
        if(!field) {
            errors.push(field);
        }
    });

    if(errors.length > 0) {
        throw new Error('Please fill in all the fields');
    }
};  