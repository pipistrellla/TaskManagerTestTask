import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Button } from 'src/shared/ui/Button/Button';
import { Text } from 'src/shared/ui/Text';

import cls from './EditTask.module.scss';

interface EditTaskProps {
    className?: string;
}

export const EditTask: FC<EditTaskProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.editTask, {}, [className])}>
            <Button onClick={() => console.log(123)}>Добавить подзадачу</Button>

            <Modal>
                <Text title="Редактирование задачи" />
                <Button>сохранить</Button>
                <Button>сохранить</Button>
            </Modal>
        </div>
    );
});
