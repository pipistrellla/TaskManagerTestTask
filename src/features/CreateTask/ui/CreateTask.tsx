import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input';

import cls from './CreateTask.module.scss';

interface CreateTaskProps {
    className?: string;
}

export const CreateTask: FC<CreateTaskProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.createTask, {}, [className])}>
            <Button onClick={() => console.log(123)}>Добавить подзадачу</Button>
            <Modal>
                <Input label="Введите название задачи" />
                <Input label="Введите текст задачи" />
                <Button>Отмена</Button>
                <Button>Создать</Button>
            </Modal>
        </div>
    );
});
