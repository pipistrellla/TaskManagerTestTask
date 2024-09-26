import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './CreateTask.module.scss';

interface CreateTaskProps {
    className?: string;
}

export const CreateTask: FC<CreateTaskProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.createTask, {}, [className])}>123</div>
    );
});
