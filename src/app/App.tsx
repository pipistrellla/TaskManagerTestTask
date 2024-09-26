import { Checkbox } from '@headlessui/react';
import { RightAndLeftLayout } from 'src/shared/layouts/RightAndLeftLayout';
import { classNames } from 'src/shared/lib/helpers/ClassNames/ClassNames';

function App() {
    return (
        <div className={classNames('app', {}, ['app_theme_light'])}>
            <RightAndLeftLayout
                LeftContent={<Checkbox />}
                rightContent={<div>testData</div>}
            />
        </div>
    );
}

export default App;
