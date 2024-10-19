import { FC } from 'react';

import { TaskmanagerPage } from 'src/pages/TaskmanagerPage';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';
import { useTheme } from 'src/shared/lib/hooks/useTheme/useTheme';

import { withTheme } from './providers/ThemeProvider';

interface AppProps {}

const App: FC<AppProps> = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <TaskmanagerPage />
        </div>
    );
};

export default withTheme(App);
