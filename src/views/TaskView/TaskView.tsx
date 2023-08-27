import {useEffect, useState } from 'react';
import { AddTask } from '../../componensts/AddTask/AddTask'
import { Tasks } from '../../componensts/Tasks/Tasks'
import { API_URL } from '../../config/api';
import { snackbarMessage } from '../../utils/snackbar';
import './TaskView.scss'

import {TasksInterface} from 'types';

export const TaskView = () =>{

    const [tasks , setTasks] = useState<TasksInterface[]>([]);

    useEffect(() => {

        (async () => {
            const res = await fetch(`${API_URL}/tasks`, {
                method: 'GET',
            });
            const data: TasksInterface[] = await res.json();
            setTasks(data);
        })();

    }, []);

    return(
        <>
            <div className="tasks-container">
                <AddTask tasks={tasks} setTasks={setTasks} />
                <Tasks tasks={tasks} setTasks={setTasks} />
            </div>
        </>
    )
}