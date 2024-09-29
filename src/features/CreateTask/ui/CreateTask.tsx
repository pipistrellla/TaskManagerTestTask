import React, { FC, memo, useCallback, useState } from 'react';

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

export const CreateTask: FC<CreateTaskProps> = memo((props) => {
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

    return (
        <div className={classNames(cls.createTask, {}, [className])}>
            <Button onClick={addSubTaskHandler}>Создание задачи</Button>

            <Modal lazy onClose={CloseModalHandler} isOpen={isModalOpen}>
                <VStack gap="24">
                    <Text title="Создать задачу" />

                    <Input />
                    <Input size="l" />

                    <HStack justify="end" max>
                        <Button>Создать</Button>
                        <Button onClick={CloseModalHandler}>Отменить</Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
