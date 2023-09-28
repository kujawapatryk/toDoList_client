import React, {ChangeEvent, useState, KeyboardEvent } from 'react';
import { TasksInterface } from 'types';
import { API_URL } from '../../config/api';
import { snackbarMessage } from '../../utils/snackbar';
import axios from "axios";

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

        const res = await axios.post(`${API_URL}/tasks/`,{content});

            if (res.status === 201) {
                const createdTask = await res.data;

                setContent('');
                setTasks([createdTask, ...tasks]);
                snackbarMessage('taskAdded');
            } else
                snackbarMessage('addTaskError');

    }

    const handleKeyPress =async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await addTaskHandle();
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