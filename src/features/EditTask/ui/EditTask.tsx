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

    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const EditTaskHandler = useCallback(() => {
        setIsModalOpen(true);
        TaskListStore.SetEditTask();
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

    const onClickSaveEditedTask = useCallback(() => {
        TaskListStore.SaveEditTask();
        TaskListStore.SaveToLocalStorage();
        setIsModalOpen(false);
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
                    <Text className={cls.Modal} title="Редактирование задачи" />

                    <Input
                        value={TaskListStore.tempTask?.name}
                        onChange={onChangeTaskNameHandler}
                    />
                    <Input
                        value={TaskListStore.tempTask?.description}
                        onChange={onChangeTaskDescription}
                    />

                    <HStack justify="between" max>
                        <Button color="success" onClick={onClickSaveEditedTask}>
                            сохранить
                        </Button>
                        <Button color="error" onClick={CloseModalHandler}>
                            отменить
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
