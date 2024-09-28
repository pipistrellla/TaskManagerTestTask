import React, { FC } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

const VStack: FC<VStackProps> = (props) => {
    const { align = 'start' } = props;
    return <Flex {...props} direction="column" align={align} />;
};

export default VStack;
