import React, { FC, memo } from 'react';

import { Button } from '@headlessui/react';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { Modal } from 'src/shared/Modal';
import { Input } from 'src/shared/ui/Input';

import cls from './CreateTask.module.scss';

interface CreateTaskProps {
    className?: string;
}

export const CreateTask: FC<CreateTaskProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.createTask, {}, [className])}>
            <Modal>
                <Input label="Введите название задачи" />
                <Input label="Введите текст задачи" />
                <Button>Отмена</Button>
                <Button>Создать</Button>
            </Modal>
        </div>
    );
});
