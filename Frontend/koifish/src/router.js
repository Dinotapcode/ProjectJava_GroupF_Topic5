import HomePage from './pages/users/homePage';
import GioithieuPage from './pages/users/gioithieuPage';
import BlogPage from './pages/users/blogPage/BlogPage';
import BlogDetail from './pages/users/blogPage/BlogDetail';
import TracuuPage from './pages/users/tracuuPage';
import SanphamPage from './pages/users/sanphamPage';
import ProductDetail from './pages/users/sanphamPage/ProductDetailPages';
import LoginPage from './pages/users/loginPage';
import PersonalPage from './pages/users/personalPage';
import MasterLayout from './pages/users/theme/masterLayout';
import { ROUTERS } from './utils/router';
import { Route, Routes } from 'react-router-dom';
import ProductDetailPage from './pages/users/sanphamPage/ProductDetailPages';

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
            path: '/san-pham-phong-thuy/:id',
            Component: <ProductDetailPage />,
        },

        {
            path: ROUTERS.USER.LOGIN,
            Component: <LoginPage />,
        },

        {
            path: '/post/:id',
            Component: <BlogDetail />,
        },

        {
            path: ROUTERS.USER.PROFILE,
            Component: <PersonalPage />,
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