import { AddTask } from '../../componensts/AddTask/AddTask'
import { Tasks } from '../../componensts/Tasks/Tasks'
import './TaskView.scss'

export const TaskView = () =>{

    return(
        <>
            <div className="tasks-container">
                <AddTask />
                <Tasks />
            </div>
        </>
    )
}