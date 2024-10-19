import React, { FC, memo } from 'react';

import { CreateTask } from 'src/features/CreateTask';
import { DeleteTask } from 'src/features/DeleteTask';
import { EditTask } from 'src/features/EditTask';
import { ThemeSwitcher } from 'src/features/ThemeSwitcher';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Card } from 'src/shared/ui/Card';
import { HStack } from 'src/shared/ui/Stack';

interface TaskListHeaderProps {
    className?: string;
}

export const TaskListHeader: FC<TaskListHeaderProps> = memo(
    (props: TaskListHeaderProps) => {
        const { className } = props;

        return (
            <div className={classNames('', {}, [className])}>
                <Card variant="light">
                    <HStack justify="center" max gap="16">
                        <CreateTask />
                        <DeleteTask />
                        <EditTask />
                        <ThemeSwitcher />
                    </HStack>
                </Card>
            </div>
        );
    },
);
