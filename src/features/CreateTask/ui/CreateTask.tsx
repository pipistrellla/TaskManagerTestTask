import React, { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { TaskListStore } from 'src/entities/Task';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input';
import { VStack, HStack } from 'src/shared/ui/Stack';
import { Text } from 'src/shared/ui/Text';

import cls from './CreateTask.module.scss';

interface CreateTaskProps {
    className?: string;
}

export const CreateTask: FC<CreateTaskProps> = observer((props) => {
    const { className } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const addTaskHandler = useCallback(() => {
        setIsModalOpen(true);
        TaskListStore.SetTempTask();
    }, []);

    const CloseModalHandler = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const onChangeTaskNameHandler = useCallback((value: string) => {
        TaskListStore.SetTempTaskName(value);
    }, []);

    const onChangeTaskDescription = useCallback((value: string) => {
        TaskListStore.SetTempTaskDescription(value);
    }, []);

    const onClickCreateNewBigTask = useCallback(() => {
        TaskListStore.AddNewBigTask();
        setIsModalOpen(false);
    }, []);

    const onClickCreateNewTask = useCallback(() => {
        TaskListStore.AddNewTask();
        setIsModalOpen(false);
    }, []);

    // вынести создание в отдельные функции
    return (
        <div className={classNames(cls.createTask, {}, [className])}>
            <Button onClick={addTaskHandler}>Создание задачи</Button>

            <Modal lazy onClose={CloseModalHandler} isOpen={isModalOpen}>
                <VStack gap="24">
                    <Text className={cls.Modal} title="Создать задачу" />

                    <Input
                        value={TaskListStore.tempTask?.name}
                        onChange={onChangeTaskNameHandler}
                    />
                    <Input
                        value={TaskListStore.tempTask?.description}
                        onChange={onChangeTaskDescription}
                    />

                    <HStack justify="center" max gap="32">
                        <Button onClick={onClickCreateNewBigTask}>
                            Создать новую задачу
                        </Button>
                        <Button
                            disabled={!TaskListStore.activeTask}
                            onClick={onClickCreateNewTask}
                        >
                            Создать подзадачу
                        </Button>
                        <Button onClick={CloseModalHandler}>Отменить</Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
