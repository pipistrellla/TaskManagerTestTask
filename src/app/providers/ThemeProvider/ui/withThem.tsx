import { Theme } from 'src/shared/const/theme';

import { ThemeProvider } from './ThemeProvider';

export const withTheme = (Component: React.ComponentType) => () => {
    const defaultTheme: Theme = Theme.LIGHT;

    return (
        <ThemeProvider initialTheme={defaultTheme}>
            <Component />
        </ThemeProvider>
    );
};
