import React, { FC, memo, useCallback } from 'react';

import ThemeIcon from 'src/shared/assets/icons/theme.svg';
import { LOCAL_STORAGE_THEME_KEY } from 'src/shared/const/localStorage';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { useTheme } from 'src/shared/lib/hooks/useTheme/useTheme';
import { Button } from 'src/shared/ui/Button/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(
    ({ className }: ThemeSwitcherProps) => {
        const { theme, toggleTheme } = useTheme();

        const onTogglehandler = useCallback(() => {
            toggleTheme((newTheme) => {
                localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
            });
        }, [toggleTheme]);

        return (
            <Button
                className={classNames('', {}, [className])}
                variant="clear"
                onClick={onTogglehandler}
            >
                <img src={ThemeIcon} alt="theme" />
            </Button>
        );
    },
);
