import React, { FC, memo } from 'react';

import { Button } from '@headlessui/react';
import { observer } from 'mobx-react-lite';
import { TaskList } from 'src/entities/Task';
import TaskListStore from 'src/entities/Task/model/store/TaskListStore';
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
                <Button onClick={() => TaskListStore.DeleteActiveTask()}>
                    Удалить
                </Button>
                <Button onClick={() => TaskListStore.AddTask()}>
                    Добавить
                </Button>
                <RightAndLeftLayout
                    leftContent={<TaskList data={TaskListStore.TaskListData} />}
                    rightContent={TaskListStore.activeTaskId}
                />
            </div>
        );
    }),
);
