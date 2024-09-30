import React, { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';
import TaskListStore from 'src/entities/Task/model/store/TaskListStore';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { Text } from 'src/shared/ui/Text';

import cls from './EditTask.module.scss';

interface EditTaskProps {
    className?: string;
}

export const EditTask: FC<EditTaskProps> = observer((props) => {
    const { className } = props;

    const [editedTask, setEditedTask] = useState({
        ...TaskListStore.activeTask,
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const EditTaskHandler = useCallback(() => {
        setIsModalOpen(true);
        TaskListStore.EditTask();
    }, []);

    const CloseModalHandler = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const onChangeTaskNameHandler = useCallback((value: string) => {
        TaskListStore.SetNewTaskName(value);
    }, []);

    const onChangeTaskDescription = useCallback((value: string) => {
        TaskListStore.SetNewTaskDescription(value);
    }, []);

    return (
        <div className={classNames(cls.editTask, {}, [className])}>
            <Button
                disabled={!TaskListStore.activeTask}
                onClick={EditTaskHandler}
            >
                Редактировать задачу
            </Button>

            <Modal lazy onClose={CloseModalHandler} isOpen={isModalOpen}>
                <VStack gap="24">
                    <Text title="Редактирование задачи" />

                    <Input value={TaskListStore.tempTask?.name} />
                    <Input
                        size="l"
                        value={TaskListStore.tempTask?.description}
                    />

                    <HStack justify="end" max>
                        <Button>сохранить</Button>
                        <Button onClick={CloseModalHandler}>отменить</Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
