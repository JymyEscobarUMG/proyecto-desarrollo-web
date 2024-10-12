export const getAllErrorMessages = (errors: { msg: string }[]) => {
    return errors.map(error => error.msg);
};