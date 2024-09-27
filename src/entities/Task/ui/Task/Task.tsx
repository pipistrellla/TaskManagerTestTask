import React, { useState } from 'react';

import ArrowLogo from 'src/shared/assets/icons/arrow.svg';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Button } from 'src/shared/ui/Button/Button';

import cls from './Task.module.scss';
import TaskListStore, { TaskProps } from '../../model/store/TaskListStore';

export type TaskNodeProps = {
    task: TaskProps;
};

export const Task: React.FC<TaskNodeProps> = (props) => {
    const { task } = props;
    const [isOpen, setIsOpen] = useState(false);

    const OnClickToggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={classNames(cls.Task, {}, [])}>
            <div className={cls.taskName}>
                {task.children && task.children.length > 0 && (
                    <Button onClick={OnClickToggleOpen} addonRight>
                        <img
                            className={classNames(
                                cls.Icon,
                                { [cls.opened]: isOpen },
                                [],
                            )}
                            src={ArrowLogo}
                            alt="arrow"
                        />
                    </Button>
                )}
                <Button onClick={() => TaskListStore.setActiveTask(task)}>
                    {task.name}
                </Button>
            </div>
            {isOpen && task.children && (
                <div>
                    {task.children.map((child) => (
                        <Task key={child.id} task={child} />
                    ))}
                </div>
            )}
        </div>
    );
};
