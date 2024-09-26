import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './DeleteTask.module.scss';

interface DeleteTaskProps {
    className?: string;
}

export const DeleteTask: FC<DeleteTaskProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.deleteTask, {}, [className])}>123</div>
    );
});
