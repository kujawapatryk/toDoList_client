import { enqueueSnackbar } from 'notistack';

import { message } from './message';

export const snackbarMessage = (key:string): void =>{
    const  { value,variant } = message[key];
    enqueueSnackbar(value, { variant: variant });
}