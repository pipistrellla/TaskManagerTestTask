import React, { FC, memo } from 'react';

import { TaskProps } from 'src/entities/Task/model/store/TaskListStore';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { VStack } from 'src/shared/ui/Stack';
import { Text } from 'src/shared/ui/Text';

import cls from './TaskDetails.module.scss';

interface TaskDetailsProps {
    className?: string;
    task: TaskProps | null;
}

export const TaskDetails: FC<TaskDetailsProps> = memo((props) => {
    const { className, task } = props;

    if (!task) {
        return null;
    }

    let content;

    if (task.children.length === 0) {
        content = null;
    } else {
        content = task.children.map((item) => (
            <Text text={`${item.id} ${item.name}`} />
        ));
    }

    return (
        <div className={classNames(cls.taskDetails, {}, [className])}>
            <VStack gap="32">
                <Text title={`${task.id} ${task.name}`} size="l" />
                <Text title="Подзадачи:" />
                {content}
            </VStack>
        </div>
    );
});
