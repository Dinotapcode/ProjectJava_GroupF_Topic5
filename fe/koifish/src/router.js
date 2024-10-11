import HomePage from './pages/users/homePage';
import GioithieuPage from './pages/users/gioithieuPage';
import BlogPage from './pages/users/blogPage';
import TracuuPage from './pages/users/tracuuPage';
import SanphamPage from './pages/users/sanphamPage';
import LoginPage from './pages/users/loginPage';
import MasterLayout from './pages/users/theme/masterLayout';
import { ROUTERS } from './utils/router';
import { Route, Routes } from 'react-router-dom';

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            Component: <HomePage />,
        },
        {
            path: ROUTERS.USER.GIOITHIEU,
            Component: <GioithieuPage />,
        },
        {
            path: ROUTERS.USER.BLOG,
            Component: <BlogPage />,
        },
        {
            path: ROUTERS.USER.TRACUU,
            Component: <TracuuPage />,
        },
        {
            path: ROUTERS.USER.SANPHAM,
            Component: <SanphamPage />,
        },
        {
            path: ROUTERS.USER.LOGIN,
            Component: <LoginPage />,
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