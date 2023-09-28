import {useEffect, useState } from 'react';
import { AddTask } from '../../componensts/AddTask/AddTask'
import { Tasks } from '../../componensts/Tasks/Tasks'
import { API_URL } from '../../config/api';
import axios from "axios";
import {TasksInterface} from 'types';

import './TaskView.scss'




export const TaskView = () =>{

    const [tasks , setTasks] = useState<TasksInterface[]>([]);

    useEffect(() => {

        (async () => {
            const res = await axios.get(`${API_URL}/tasks`);
            const data: TasksInterface[] = await res.data;
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