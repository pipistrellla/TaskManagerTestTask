import React, { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { TaskListStore } from 'src/entities/Task';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Button } from 'src/shared/ui/Button/Button';
import { VStack, HStack } from 'src/shared/ui/Stack';
import { Text } from 'src/shared/ui/Text';

interface DeleteTaskProps {
    className?: string;
}

export const DeleteTask: FC<DeleteTaskProps> = observer((props) => {
    const { className } = props;
    const [editedTask, setEditedTask] = useState({
        ...TaskListStore.activeTask,
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const DeleteTaskHandler = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const CloseModalHandler = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <div className={classNames('', {}, [className])}>
            <Button
                disabled={!TaskListStore.activeTask}
                onClick={DeleteTaskHandler}
            >
                Удалить текущую задачу
            </Button>

            <Modal lazy onClose={CloseModalHandler} isOpen={isModalOpen}>
                <VStack gap="24">
                    <Text
                        title="Удалить текущую задачу"
                        text="Все подзадачи будут удалены!!!"
                    />

                    <HStack justify="between" max>
                        <Button
                            onClick={() => {
                                TaskListStore.DeleteActiveTask();
                                CloseModalHandler();
                            }}
                        >
                            Удалить
                        </Button>
                        <Button onClick={CloseModalHandler}>Отменить</Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
