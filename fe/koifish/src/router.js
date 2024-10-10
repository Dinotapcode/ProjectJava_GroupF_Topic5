import HomePage from './pages/users/homePage';
import MasterLayout from './pages/users/theme/masterLayout';
import TracuuPage from './pages/users/tracuuPage';
import { ROUTERS } from './utils/router';
import { Route, Routes } from 'react-router-dom';

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            Component: <HomePage />,
        },
        {
            path: ROUTERS.USER.TRACUU,
            Component: <TracuuPage />,
        },
    ]
    return (
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route
                            key={key}
                            path={item.path}
                            element={item.Component}
                    />
                ))}
            </Routes>
        </MasterLayout>
    );
}


const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;