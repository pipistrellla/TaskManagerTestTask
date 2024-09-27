import { TaskmanagerPage } from 'src/pages/TaskmanagerPage';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

function App() {
    return (
        <div className={classNames('app', {}, ['app_theme_light'])}>
            <TaskmanagerPage />
        </div>
    );
}

export default App;
