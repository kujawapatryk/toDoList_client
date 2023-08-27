
type Messages = {
    [key: string]: {
        value: string;
        variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined;
    };
}

export const message: Messages ={
    done: {value: "Wykonane", variant: undefined},
    deleteTask: {value: "Usuń", variant: undefined},
    taskConfirmation: { value: 'Zadanie oznaczone jako wykonane.', variant: 'success' },
    taskDeleted: { value: 'Zadanie usunięte.', variant: 'success' },
    error: { value: 'Nieznany błąd.', variant: 'error' },
    taskAdded: { value: 'Zadanie dodane.', variant: 'success' },
    addTaskError: { value: 'Nie udało się dodać zadania. Spróbuj ponownie.', variant: 'error' },
    maxCharacterCount : {value: 'Maksymalna ilość znaków to 120', variant: 'warning' },
    emptyFieldError: { value: 'Pole zadanie nie może być puste.', variant: 'error' },
}