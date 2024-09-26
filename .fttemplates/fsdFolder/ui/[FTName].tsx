import React, { FC, memo } from 'react';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import cls from './[FTName].module.scss';

interface [FTName]Props {
className?: string;
}

export const [FTName]: FC<[FTName]Props> = memo((props) => {
const { className } = props;

return (
    <div className={classNames(cls.[FTName | camelcase], {}, [className])}>
        123
    </div>
);
})
