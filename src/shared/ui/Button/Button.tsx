import React, {
    ButtonHTMLAttributes,
    FC,
    ForwardedRef,
    forwardRef,
    ReactNode,
} from 'react';

import { Mods, classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    color?: ButtonColor;
}

export const Button: FC<ButtonProps> = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            size = 'm',
            disabled,
            fullWidth,
            addonLeft,
            addonRight,
            color = 'normal',
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
        };

        const additionalClasses = [
            className,
            cls[size],
            cls[variant],
            cls[color],
        ];

        return (
            <button
                type="button"
                className={classNames(cls.Button, mods, additionalClasses)}
                disabled={disabled}
                {...otherProps}
                ref={ref}
            >
                {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
                {children}
                {addonRight && (
                    <div className={cls.addonRight}>{addonRight}</div>
                )}
            </button>
        );
    },
);
