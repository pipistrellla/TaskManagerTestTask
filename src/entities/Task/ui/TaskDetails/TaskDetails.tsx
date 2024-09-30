import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { TaskProps } from 'src/entities/Task/model/store/TaskListStore';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { VStack } from 'src/shared/ui/Stack';
import { Text } from 'src/shared/ui/Text';

import cls from './TaskDetails.module.scss';

interface TaskDetailsProps {
    className?: string;
    task: TaskProps | null;
}

export const TaskDetails: FC<TaskDetailsProps> = observer((props) => {
    const { className, task } = props;

    if (!task) {
        return null;
    }

    let subTasks;

    if (task.children.length === 0) {
        subTasks = null;
    } else {
        subTasks = (
            <VStack gap="8">
                <Text bold title="Подзадачи:" />
                {task.children.map((item) => (
                    <Text key={item.id} text={`${item.id} ${item.name}`} />
                ))}
            </VStack>
        );
    }

    return (
        <div className={classNames(cls.taskDetails, {}, [className])}>
            <VStack gap="32">
                <Text bold title={`${task.id} ${task.name}`} size="l" />
                {task.description && <Text size="l" text={task.description} />}
                {subTasks}
            </VStack>
        </div>
    );
});
