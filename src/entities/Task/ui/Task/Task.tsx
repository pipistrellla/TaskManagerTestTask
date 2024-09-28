import React, { useState } from 'react';

import ArrowLogo from 'src/shared/assets/icons/arrow.svg';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Button } from 'src/shared/ui/Button/Button';
import { Card } from 'src/shared/ui/Card';

import cls from './Task.module.scss';
import TaskListStore, { TaskProps } from '../../model/store/TaskListStore';

export type TaskNodeProps = {
    task: TaskProps;
    className?: string;
};

export const Task: React.FC<TaskNodeProps> = (props) => {
    const { task, className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const OnClickToggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={classNames(cls.Task, {}, [className])}>
            <Card border="square" variant="light" className={cls.taskName}>
                {task.children && task.children.length > 0 && (
                    <Button
                        onClick={OnClickToggleOpen}
                        addonRight
                        variant="clear"
                    >
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
                <Button
                    variant="clear"
                    onClick={() => TaskListStore.setActiveTask(task)}
                >
                    {task.id} {task.name}
                </Button>
            </Card>
            {isOpen && task.children && (
                <div>
                    {task.children.map((child) => (
                        <Task
                            className={cls.AdditionalTask}
                            key={child.id}
                            task={child}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
