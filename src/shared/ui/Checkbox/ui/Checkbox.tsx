import { Checkbox as HeadlessCheckbox } from '@headlessui/react';

interface CheckboxProps {
    className: string;
    checked: boolean;
    setChecked: () => void;
}

export function Checkbox(props: CheckboxProps) {
    const { className, checked, setChecked } = props;

    return (
        <HeadlessCheckbox
            checked={checked}
            onChange={setChecked}
            data-checked
            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
        >
            <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
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
