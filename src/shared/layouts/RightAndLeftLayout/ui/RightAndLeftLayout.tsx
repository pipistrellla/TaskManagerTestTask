import React, { FC, ReactNode } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './RightAndLeftLayout.module.scss';

interface RightAndLeftLayoutProps {
    className?: string;
    rightContent: ReactNode;
    leftContent: ReactNode;
}

export const RightAndLeftLayout: FC<RightAndLeftLayoutProps> = (props) => {
    const { className, leftContent, rightContent } = props;

    return (
        <div className={classNames(cls.rightAndLeftLayout, {}, [className])}>
            <div className={classNames(cls.right, {}, [className])}>
                {rightContent}
            </div>
            <div className={classNames(cls.left, {}, [className])}>
                {leftContent}
            </div>
        </div>
    );
};
