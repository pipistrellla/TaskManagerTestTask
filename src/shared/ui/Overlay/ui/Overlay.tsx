import { FC, memo } from 'react';

import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = memo((props: OverlayProps) => {
    const { className, onClick } = props;

    return (
        <div
            onClick={onClick}
            className={classNames(cls.overlay, {}, [className])}
        />
    );
});
