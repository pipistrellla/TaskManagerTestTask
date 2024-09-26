import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './Task.module.scss';

interface TaskProps {
    className?: string;
}

export const Task: FC<TaskProps> = memo((props) => {
    const { className } = props;

    return <div className={classNames(cls.task, {}, [className])}>123</div>;
});
