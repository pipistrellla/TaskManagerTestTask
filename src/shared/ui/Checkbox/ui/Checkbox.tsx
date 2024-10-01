import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

import cls from './Checkbox.module.scss';

type CheckboxSize = 's' | 'm' | 'l';

interface CheckboxProps {
    className: string;
    checked: boolean;
    size?: CheckboxSize;
    setChecked: () => void;
}

export function Checkbox(props: CheckboxProps) {
    const { className, checked, setChecked, size = 'm' } = props;

    return (
        <HeadlessCheckbox
            checked={checked}
            onChange={setChecked}
            data-checked
            // className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
            className={classNames(cls.checkbox, {}, [className])}
        >
            <svg
                className={classNames(cls.svg, { [cls.unchecked]: !checked }, [
                    cls[size],
                ])}
                viewBox="0 0 14 14"
                fill="none"
            >
                <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </HeadlessCheckbox>
    );
}
