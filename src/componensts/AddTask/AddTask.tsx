import {ChangeEvent, useState, KeyboardEvent } from 'react';
import { TasksInterface } from 'types';
import { API_URL } from '../../config/api';
import { snackbarMessage } from '../../utils/snackbar';
import { Btn } from '../Btn/Btn';
import './AddTask.scss';

type StateProps={
    tasks: TasksInterface[];
    setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>;
}
export const AddTask = ({ tasks, setTasks }: StateProps) => {

    const [content, setContent] = useState('')

    const contentHandle = (event: ChangeEvent<HTMLInputElement>) => {
        const newContent = event.target.value
        if (newContent.length <= 120) {
            setContent(newContent);
        }else
            snackbarMessage('maxCharacterCount');
    }

    const addTaskHandle = async () => {
        if (!content) {
            snackbarMessage('emptyFieldError');
            return;
        }
        const res = await fetch(`${API_URL}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content})
        });

        if(res.status === 201){
            const createdTask = await res.json();

            setContent('');
            setTasks([createdTask,...tasks]);
            snackbarMessage('taskAdded');
        }else
            snackbarMessage('addTaskError');
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandle();
        }
    };

    return(
        <>
            <div className="task-input">
                <input
                    type="text"
                    id="taskContent"
                    placeholder="Wprowadź treść zadania"
                    value={content}
                    onChange={contentHandle}
                    onKeyPress={handleKeyPress} 
                />
                    <button id="addTaskButton" onClick={addTaskHandle}>Dodaj zadanie</button>

            </div>
        </>
    );
}