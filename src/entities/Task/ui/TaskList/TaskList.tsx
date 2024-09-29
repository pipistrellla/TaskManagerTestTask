import React from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Card } from 'src/shared/ui/Card';

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
            <Card variant="light">
                {data.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </Card>
        </div>
    );
};
