import React, { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { TaskListStore } from 'src/entities/Task';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Button } from 'src/shared/ui/Button/Button';
import { Modal } from 'src/shared/ui/Modal';
import { VStack, HStack } from 'src/shared/ui/Stack';
import { Text } from 'src/shared/ui/Text';

interface DeleteTaskProps {
    className?: string;
}

export const DeleteTask: FC<DeleteTaskProps> = observer((props) => {
    const { className } = props;

    const [isModalOpen, setIsModalOpen] = useState<boolean>();

    const onClickOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const CloseModalHandler = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const OnClickDeleteTask = useCallback(() => {
        TaskListStore.DeleteActiveTask();
        TaskListStore.SaveToLocalStorage();
        CloseModalHandler();
    }, [CloseModalHandler]);

    return (
        <div className={classNames('', {}, [className])}>
            <Button
                disabled={!TaskListStore.activeTask}
                onClick={onClickOpenModal}
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
                        <Button color="success" onClick={OnClickDeleteTask}>
                            Удалить
                        </Button>
                        <Button color="error" onClick={CloseModalHandler}>
                            Отменить
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </div>
    );
});
