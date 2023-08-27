import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import { Btn } from '../../Btn/Btn';

import './SingleTask.scss';

interface Props {
    content: string;
    onClickCheckbox: ChangeEventHandler<HTMLInputElement>;
    onClick: MouseEventHandler<HTMLInputElement>;
    btnValue: string;
    done: boolean;
}
export const SingleTask = ({ content, onClick, onClickCheckbox, btnValue, done }: Props) => {
    return (

        <div className={`task ${done ? 'task-done' : 'task-to-do'}`}>
            <p className={`${done ? 'task-content task-content-done' : 'task-content'}`}>{content}</p>
            <div className="task-actions">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={onClickCheckbox}
                    />
                    Wykonane
                </label>
                <Btn value="Usuń" onClick={onClick} />
            </div>
        </div>

    );
};