import React, { FC, HTMLAttributes } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'square' | 'partial';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
    fullHeight?: boolean;
}

export const Card: FC<CardProps> = (props) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        padding = '8',
        border = 'square',
        fullHeight,
        ...otherProps
    } = props;

    const mapPaddingToClass: Record<CardPadding, string> = {
        '0': 'gap_0',
        '8': 'gap_8',
        '16': 'gap_16',
        '24': 'gap_24',
    };

    const paddingsClass = mapPaddingToClass[padding];

    const mods = {
        [cls.max]: max,
        [cls.fullHeight]: fullHeight,
    };

    const additionalClasses = [
        className,
        cls[variant],
        cls[paddingsClass],
        cls[border],
    ];

    return (
        <div
            className={classNames(cls.card, mods, additionalClasses)}
            {...otherProps}
        >
            {children}
        </div>
    );
};
