import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './EditTask.module.scss';

interface EditTaskProps {
    className?: string;
}

export const EditTask: FC<EditTaskProps> = memo((props) => {
    const { className } = props;

    return <div className={classNames(cls.editTask, {}, [className])}>123</div>;
});
