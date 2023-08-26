import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/api';
import { Btn } from '../Btn/Btn';

//import './Btn.scss';

interface Props {
    id: number;
    content: string;
    done: boolean;
}
export const Tasks = () => {

    const [tasksToDo , setTasksToDo] = useState<Props[]>([]);
    const [tasksDone , setTasksDone] = useState<Props[]>([]);

    useEffect(() => {
        
        (async () => {
            const res = await fetch(`${API_URL}/tasks`, {
                method: 'GET',
               });
            const data: Props[] = await res.json();

            const groupedTasks: { done: Props[]; toDo: Props[] } = data.reduce(
                (acc, task) => {
                    if (task.done) {
                        acc.done.push(task);
                    } else {
                        acc.toDo.push(task);
                    }

                    return acc;
                },
                { done: [], toDo: [] } as { done: Props[]; toDo: Props[] }
            );

           setTasksToDo(groupedTasks.toDo);
           setTasksDone(groupedTasks.done);
        })();

    }, []);

    const markAsDone = async (id:number) =>{
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PATCH',
        });
        console.log(res)
    }
    
    
    
    return (
        <>
            Zadania do wykonania
            {tasksToDo &&
                tasksToDo.map((item, index) => (
                    <div key={index}>
                        <div>{item.content}</div>
                        <div><Btn value="Zrobione" onClick={() =>markAsDone(item.id)} /></div>
                    </div>
            ))}

            Wykonanae zadania
            {tasksDone &&
                tasksDone.map((item, index) => (

                    <div key={index}>{item.content}</div>
                ))}
        </>
    );
};