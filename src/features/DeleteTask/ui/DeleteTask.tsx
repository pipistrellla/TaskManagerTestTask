import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Button } from 'src/shared/ui/Button/Button';
import { Text } from 'src/shared/ui/Text';

import cls from './DeleteTask.module.scss';

interface DeleteTaskProps {
    className?: string;
}

export const DeleteTask: FC<DeleteTaskProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.deleteTask, {}, [className])}>
            <Button onClick={() => console.log(123)}>Добавить подзадачу</Button>
            <Modal>
                <Text
                    title="Удалить задачу?"
                    text="Все подзадачи будут удалены"
                />
                <Button>нет</Button>
                <Button>да</Button>
            </Modal>
        </div>
    );
});
