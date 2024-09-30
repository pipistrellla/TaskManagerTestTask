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
    const [Task, setTask] = useState({
        ...TaskListStore.activeTask,
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const addSubTaskHandler = useCallback(() => {
        setIsModalOpen(true);
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

    // вынести создание в отдельные функции
    return (
        <div className={classNames(cls.createTask, {}, [className])}>
            <Button onClick={addSubTaskHandler}>Создание задачи</Button>

            <Modal lazy onClose={CloseModalHandler} isOpen={isModalOpen}>
                <VStack gap="24">
                    <Text title="Создать задачу" />

                    <Input
                        value={TaskListStore.newTask.name}
                        onChange={onChangeTaskNameHandler}
                    />
                    <Input
                        value={TaskListStore.newTask.description}
                        onChange={onChangeTaskDescription}
                        size="l"
                    />

                    <HStack justify="end" max gap="8">
                        <Button onClick={TaskListStore.AddNewBigTask}>
                            Создать новую задачу
                        </Button>
                        <Button onClick={TaskListStore.AddNewTask}>
                            Создать подзадачу
                        </Button>
                        <Button onClick={CloseModalHandler}>Отменить</Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
