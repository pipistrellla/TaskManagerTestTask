import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './TaskmanagerPage.module.scss';

interface TaskmanagerPageProps {
    className?: string;
}

export const TaskmanagerPage: FC<TaskmanagerPageProps> = memo((props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.taskmanagerPage, {}, [className])}>
            123
        </div>
    );
});
