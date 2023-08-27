import {ChangeEvent, useState } from 'react';
import { API_URL } from '../../config/api';
import { snackbarMessage } from '../../utils/snackbar';
import { Btn } from '../Btn/Btn';
import './AddTask.scss';


export const AddTask = () => {

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
            setContent('');
            snackbarMessage('taskAdded');
        }else
            snackbarMessage('addTaskError');
    }

    return(
        <>
            <div className="task-input">
                <input type="text" id="taskContent" placeholder="Wprowadź treść zadania" value={content} onChange={contentHandle} />
                    <button id="addTaskButton" onClick={addTaskHandle}>Dodaj zadanie</button>

            </div>
        </>
    );
}