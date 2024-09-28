import React from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './TaskList.module.scss';
import { TaskProps } from '../../model/store/TaskListStore';
import { Task } from '../Task/Task';
import { TaskListHeader } from '../TaskListHeader/TaskListHeader';

export type TaskListProps = {
    data: TaskProps[];
};

export const TaskList: React.FC<TaskListProps> = (props) => {
    const { data } = props;

    return (
        <div className={classNames(cls.taskList, {}, [])}>
            <TaskListHeader />
            {data.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};
