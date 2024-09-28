import React, { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './Text.module.scss';

export type textVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: textVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    'data-testid'?: string;
}
type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

export const Text: FC<TextProps> = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
        ...otherProps
    } = props;
    // грубо говоря по размеру определяем какой тип h нужен,
    // а затем находим его по ключу и вставляем в разметку
    const HeaderTag = mapSizeToHeaderTag[size];
    const SizeClass = mapSizeToClass[size];

    const additionalClasses = [
        className,
        cls[variant],
        cls[align],
        cls[SizeClass],
    ];

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
            {title && (
                <HeaderTag
                    data-testid={`${dataTestId}.Header`}
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
                    {text}
                </p>
            )}
        </div>
    );
});
