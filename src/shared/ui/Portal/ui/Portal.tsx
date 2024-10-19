import { FC, ReactNode } from 'react';

import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

export const Portal: FC<PortalProps> = (props) => {
    const {
        children,
        element = document.getElementById('root') as HTMLElement,
    } = props;
    return createPortal(children, element);
};
