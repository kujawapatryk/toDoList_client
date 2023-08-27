import {useEffect, useState } from 'react';
import { AddTask } from '../../componensts/AddTask/AddTask'
import { Tasks } from '../../componensts/Tasks/Tasks'
import { API_URL } from '../../config/api';
import { snackbarMessage } from '../../utils/snackbar';
import './TaskView.scss'

interface Props {
    id: number;
    content: string;
    done: boolean;
}

export const TaskView = () =>{

    const [tasks , setTasks] = useState<Props[]>([]);

    useEffect(() => {

        (async () => {
            const res = await fetch(`${API_URL}/tasks`, {
                method: 'GET',
            });
            const data: Props[] = await res.json();
            console.log(data);
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