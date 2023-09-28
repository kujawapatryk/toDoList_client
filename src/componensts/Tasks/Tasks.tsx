import React from 'react';
import { API_URL } from '../../config/api';
import { message } from '../../utils/message';
import { SingleTask } from './SingleTask/SingleTask';
import { snackbarMessage } from '../../utils/snackbar'

import './Tasks.scss';
import { TasksInterface } from 'types';
import axios from "axios";

type ResMessage = {
    message: string;
    status: string;
}
type StateProps={
    tasks: TasksInterface[];
    setTasks: React.Dispatch<React.SetStateAction<TasksInterface[]>>;
}
export const Tasks = ({ tasks, setTasks }: StateProps) => {

    const markTask = async (id:number, done: boolean) =>{

        const res = await axios.patch(`${API_URL}/tasks/${id}`, { done: !done });

        if(res.status === 200){

            const data: ResMessage = res.data;
            if (data.status === 'success') {

                const updatedTasks = tasks.map((task) =>
                    task.id === id ? {...task, done: !task.done} : task
                );

                setTasks(updatedTasks);
                snackbarMessage(data.message);
            }
            else
                snackbarMessage(data.message);
        }
        else
            snackbarMessage('error');
    }

    const deleteTask = async (id: number):Promise<void> => {

        const res = await axios.delete(`${API_URL}/tasks/${id}`);

        if(res.status === 200) {

            const data: ResMessage = res.data;
            if (data.status === 'success') {

                const taskIndex = tasks.findIndex(task => task.id === id);
                if (taskIndex !== -1) {

                    const updatedTask = [...tasks];
                    updatedTask.splice(taskIndex, 1);
                    setTasks(updatedTask);
                    snackbarMessage(data.message);
                }
            }
            else
                snackbarMessage(data.message);
        }
        else
            snackbarMessage('error');
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
