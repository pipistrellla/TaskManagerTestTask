import React, { FC, memo } from 'react';

import { observer } from 'mobx-react-lite';
import { TaskList, TaskDetails, TaskListStore } from 'src/entities/Task';
import { RightAndLeftLayout } from 'src/shared/layouts/RightAndLeftLayout';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './TaskmanagerPage.module.scss';

interface TaskmanagerPageProps {
    className?: string;
}

export const TaskmanagerPage: FC<TaskmanagerPageProps> = memo(
    observer((props) => {
        const { className } = props;

        return (
            <div className={classNames(cls.taskmanagerPage, {}, [className])}>
                <RightAndLeftLayout
                    leftContent={<TaskList data={TaskListStore.TaskListData} />}
                    rightContent={
                        <TaskDetails task={TaskListStore.activeTask} />
                    }
                />
            </div>
        );
    }),
);
