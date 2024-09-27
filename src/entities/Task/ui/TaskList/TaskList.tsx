import React from 'react';

import { TaskProps } from '../../model/store/TaskListStore';
import { Task } from '../Task/Task';

export type TaskListProps = {
    data: TaskProps[];
};

export const TaskList: React.FC<TaskListProps> = (props) => {
    const { data } = props;

    return (
        <div>
            {data.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};
