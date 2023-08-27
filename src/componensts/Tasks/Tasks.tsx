import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/api';
import { message } from '../../utils/message';
import { Btn } from '../Btn/Btn';
import { SingleTask } from './SingleTask/SingleTask';
import { snackbarMessage } from '../../utils/snackbar'
import { useDeleteTask } from '../../utils/useDeleteTask';

import './Tasks.scss';

interface Props {
    id: number;
    content: string;
    done: boolean;
}
export const Tasks = () => {

    const [tasks , setTasks] = useState<Props[]>([]);

    useEffect(() => {
        
        (async () => {
            const res = await fetch(`${API_URL}/tasks`, {
                method: 'GET',
               });
            const data: Props[] = await res.json();

            setTasks(data);
        })();

    }, []);

    const markAsDone = async (id:number) =>{
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PATCH',
        });

        if(res.status === 200){

            const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            );

            setTasks(updatedTasks);
            snackbarMessage('taskConfirmation');

        }
        else
            snackbarMessage('error');
    }

    const deleteTask = async (id: number):Promise<void> => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        if(res.status === 200){
            const taskIndex = tasks.findIndex(() => id = id);
            if(taskIndex !== -1) {
                const updatedTask = [...tasks];
                updatedTask.splice(taskIndex, 1);
                setTasks(updatedTask);
                snackbarMessage('taskDeleted');
            }
            else
                snackbarMessage('error');
        }
    }

    return (
        <>
            <div className="task-list">
                <div className="task-title">Zadania do wykonania</div>
                {tasks &&
                    tasks.map((item, index) => (
                        <SingleTask
                            key={index}
                            content={item.content}

                            btnValue={message.done.value}
                            onClick={() =>deleteTask(item.id)}
                            onClickCheckbox={() =>markAsDone(item.id)}
                            done={item.done}
                        />
                ))}

            </div>
        </>
    );
};
