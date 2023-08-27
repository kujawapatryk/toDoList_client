import React, {Dispatch, SetStateAction, useEffect, useState } from 'react';
import { API_URL } from '../../config/api';
import { message } from '../../utils/message';
import { SingleTask } from './SingleTask/SingleTask';
import { snackbarMessage } from '../../utils/snackbar'

import './Tasks.scss';

interface Props {
    id: number;
    content: string;
    done: boolean;
}
type StateProps={
    tasks: Props[];
    setTasks: React.Dispatch<React.SetStateAction<Props[]>>;
}
export const Tasks = ({ tasks, setTasks }: StateProps) => {

    // const [tasks , setTasks] = useState<Props[]>([]);
    //
    // useEffect(() => {
    //
    //     (async () => {
    //         const res = await fetch(`${API_URL}/tasks`, {
    //             method: 'GET',
    //            });
    //         const data: Props[] = await res.json();
    //
    //         setTasks(data);
    //     })();
    //
    // }, []);
    //
    const markTask = async (id:number, done: boolean) =>{
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({done: !done})
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
            const taskIndex = tasks.findIndex(task => task.id === id);
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

        <div className="task-list">
            <div className="task-title">Zadania do wykonania</div>
            {tasks &&
                tasks.map((item, index) => (
                    <SingleTask
                        key={index}
                        content={item.content}

                        btnValue={message.done.value}
                        onClick={() =>deleteTask(item.id)}
                        onClickCheckbox={() =>markTask(item.id, item.done)}
                        done={item.done}
                    />
            ))}

        </div>

    );
};
